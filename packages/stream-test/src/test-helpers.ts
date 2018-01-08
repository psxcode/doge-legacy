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

export interface SpyFn<T> {
  (data?: T): void

  callCount (): number

  data (): T[]
}

export const makeSpy = <T>(name: string, message: string): SpyFn<T> => {
  let i = 0
  let data: T[] = []
  const dbg = debug(`stream-test:event-spy:${name}`)
  const spy = (value?: any) => {
    dbg(message, i, value && (value.length / 8))
    value && data.push(value)
    ++i
  }
  (spy as SpyFn<T>).callCount = () => i;
  (spy as SpyFn<T>).data = () => data
  return (spy as SpyFn<T>)
}

export const makeDataSpy = <T>() => makeSpy<T>('data', 'consume %d, length %d')

export const makeErrorSpy = <T>() => makeSpy<T>('error', 'error event #%d received')

export const makeEndSpy = <T>() => makeSpy<T>('end', 'end event received')

export interface IReadableConsumer {
  readDelayMs?: number,
  readSize?: number,
  eager?: boolean
}

export const makeOnReadableConsumer = <T>(stream: Readable,
                                       onData: (data: T) => void,
                                       { readDelayMs, readSize, eager }: IReadableConsumer = {}) => {
  const dbg = debug('stream-test:readable-consumer')
  let i = 0
  const eagerReader = (i: number) => {
    let chunk: T
    dbg('eager read at %d begin', i)
    while (chunk = stream.read(readSize)) onData(chunk)
    dbg('eager read at %d done', i)
  }
  const lazyReader = (i: number) => {
    let chunk: T
    dbg('lazy read at %d begin', i);
    (chunk = stream.read()) && onData(chunk)
    dbg('lazy read at %d done', i)
  }
  const asyncHandler = () => {
    dbg('received \'readable\' event at %d', i)
    wait(readDelayMs).then(eager
      ? eagerReader.bind(null, i)
      : lazyReader.bind(null, i)
    )
    ++i
  }
  const syncHandler = () => {
    dbg('received \'readable\' event at %d', i)
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

export const makeOnDataConsumer = <T>(stream: Readable, onData: (data: T) => void) => {
  const dbg = debug('stream-test:data-consumer')
  let i = 0
  const onDataEvent = (chunk: T) => {
    dbg('received \'data\' event at %d', i)
    onData(chunk)
    ++i
  }
  const unsubscribe = () => {
    dbg('unsubscribe at %d', i)
    stream.removeListener('data', onDataEvent)
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

export const makeReadableTest = <T> (data: T[],
                              makeReadable: (data: T[]) => Readable,
                              makeConsumer: (stream: Readable, spy: SpyFn<T>) => () => any,
                              expectFn?: (data: T[], spy: SpyFn<T>) => void) => {
  return it('should work', async function () {
    const stream = makeReadable(data)
    const spy = makeDataSpy<T>()
    const consumer = makeConsumer(stream, spy)
    await wait(100)
    consumer()
    await waitForEndOrError(stream)
    expectFn && expectFn(data, spy)
  })
}

export const xmakeReadableTest = <T>(data: T[],
                                     makeReadable: (data: T[]) => Readable,
                                     makeConsumer: (stream: Readable, spy: (data: T) => void) => () => any,
                                     expecFn?: (data: T[], spy: SpyFn<T>) => void) => {
  return void 0
}
