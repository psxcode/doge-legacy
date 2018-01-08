/* tslint:disable no-conditional-assignment */
import * as debug from 'debug'
import { EventEmitter } from 'events'
import { Readable } from 'stream'

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const waitForEvent = (ee: EventEmitter, events: string[], waitAfterMs = 0) => {
  const startedAt = Date.now()
  let listeners: Function[]
  const dbg = debug('stream-test:wait-for-event')
  const unsubscribe = () => listeners.forEach((l) => l())
  return new Promise(resolve => {
    listeners = events.map(name => {
      const listener = () => {
        dbg('\'%s\' within %dms', name, Date.now() - startedAt)
        unsubscribe()
        waitAfterMs < 0 ? resolve() : wait(waitAfterMs).then(resolve)
      }
      ee.on(name, listener)
      return () => ee.removeListener(name, listener)
    })
  })
}

export const waitForEnd = (ee: EventEmitter, waitAfterMs = 0) => waitForEvent(ee, ['end'], waitAfterMs)

export const waitForError = (ee: EventEmitter, waitAfterMs = 0) => waitForEvent(ee, ['error'], waitAfterMs)

export const waitForEndOrError = (ee: EventEmitter, waitAfterMs = 0) => waitForEvent(ee, ['end', 'error'], waitAfterMs)

export interface SpyFn {
  (data?: any): void

  callCount (): number

  data (): any[]
}

export const makeSpy = (name: string, message: string): SpyFn => {
  let i = 0
  let data: any[] = []
  const dbg = debug(`stream-test:event-spy:${name}`)
  const spy = (value: any) => {
    if (!value) {
      dbg('NO VALUE')
    }
    dbg(message, i, value && (value.length / 8))
    data.push(value)
    ++i
  }
  (spy as SpyFn).callCount = () => i;
  (spy as SpyFn).data = () => data
  return (spy as SpyFn)
}

export const makeDataSpy = () => makeSpy('data', 'consume %d, length %d')

export const makeErrorSpy = () => makeSpy('error', 'error event #%d received')

export const makeEndSpy = () => makeSpy('end', 'end event received')

export interface IReadableConsumer {
  readDelayMs?: number,
  readSize?: number,
  eager?: boolean
}

export const makeOnReadableConsumer = (stream: Readable,
                                       onData: (data: string) => void,
                                       { readDelayMs, readSize, eager }: IReadableConsumer = {}) => {
  const dbg = debug('stream-test:readable-consumer')
  let i = 0
  const eagerReader = (i: number) => {
    let chunk: string
    dbg('eager read at %d begin', i)
    while (chunk = stream.read(readSize)) onData(chunk)
    dbg('eager read at %d end', i)
  }
  const lazyReader = (i: number) => {
    let chunk: string
    dbg('lazy read at %d begin', i);
    (chunk = stream.read()) && onData(chunk)
    dbg('lazy read at %d done', i)
  }
  const asyncHandler = () => {
    dbg('received readable event at %d', i)
    wait(readDelayMs).then(eager
      ? eagerReader.bind(null, i)
      : lazyReader.bind(null, i)
    )
    ++i
  }
  const syncHandler = () => {
    eager
      ? eagerReader(i)
      : lazyReader(i)
    ++i
  }
  const unsubscribe = () => {
    dbg('unsubscribe at %d', i)
    stream.removeListener('readable', asyncHandler)
    stream.removeListener('readable', syncHandler)
    stream.removeListener('end', unsubscribe)
  }
  return () => {
    dbg('consumer subscribe')
    stream.on('readable', isFinite(readDelayMs) && readDelayMs >= 0
      ? asyncHandler
      : syncHandler)
    stream.once('end', unsubscribe)
    return unsubscribe
  }
}

export const makeOnDataConsumer = (stream: Readable, onData: (data: string) => void) => {
  const dbg = debug('stream-test:data-consumer')
  let i = 0
  const onDataEvent = (chunk: string) => {
    dbg('received data at %d', i)
    onData(chunk)
    ++i
  }
  const unsubscribe = () => {
    dbg('unsubscribe at %d', i)
    stream.removeListener('readable', onDataEvent)
    stream.removeListener('end', unsubscribe)
  }
  return () => {
    dbg('consumer subscribe')
    stream.on('data', onDataEvent)
    stream.once('end', unsubscribe)
    return unsubscribe
  }
}

export const makeStrings = (initialRepeat: number) => (repeat = 1) => {
  const arr: string[] = new Array(initialRepeat * repeat)
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = '_' + `${i}`.padStart(7, '0')
  }
  return arr
}
export const makeSmallStrings = makeStrings(4)
export const makeMediumStrings = makeStrings(64)
export const makeLargeStrings = makeStrings(256)
