/* tslint:disable no-conditional-assignment */
import * as sinon from 'sinon'
import * as debug from 'debug'
import { EventEmitter } from 'events'
import { Readable } from 'stream'

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const waitForEvent = (ee: EventEmitter, events: string[], waitMs = 0) => {
  const startedAt = Date.now()
  let listeners: Function[]
  const unsubscribe = () => listeners.forEach((l) => l())
  return new Promise(resolve => {
    listeners = events.map(name => {
      const listener = () => {
        debug('stream-test:wait-for-event')('\'%s\' within %dms', name, Date.now() - startedAt)
        unsubscribe()
        waitMs < 0 ? resolve() : wait(waitMs).then(resolve)
      }
      ee.on(name, listener)
      return () => ee.removeListener(name, listener)
    })
  })
}

export const waitForEnd = (ee: EventEmitter, waitMs = 0) => waitForEvent(ee, ['end'], waitMs)

export const waitForError = (ee: EventEmitter, waitMs = 0) => waitForEvent(ee, ['error'], waitMs)

export interface TestDataFn {
  (data?: any): void
  callCount (): number
  data (): string[]
}

export interface TestFn {
  (data?: any): void
  callCount (): number
}

export const makeDataSpy = (): TestDataFn => {
  let callCount = 0
  let data: string[] = []
  const dbg = debug('stream-test:data-spy')
  const spy = (str: string) => {
    dbg('consume %d, length %d, %s', callCount, str.length, str)
    data.push(str)
    ++callCount
  }
  (spy as TestDataFn).callCount = () => callCount;
  (spy as TestDataFn).data = () => data
  return (spy as TestDataFn)
}

export const makeErrorSpy = (): TestFn => {
  let callCount = 0
  const dbg = debug('stream-test:error-spy')
  const spy = (e: any) => {
    ++callCount
    dbg(`error received: ${e.message}`)
  }
  (spy as TestFn).callCount = () => callCount
  return (spy as TestFn)
}

export const makeEndSpy = (): TestFn => {
  let callCount = 0
  const dbg = debug('stream-test:end-spy')
  const spy = () => {
    ++callCount
    dbg('end received')
  }
  (spy as TestFn).callCount = () => callCount
  return (spy as TestFn)
}

export const makePullConsumer = (stream: Readable, onData: (data: string) => void) => {
  const dbg = debug('stream-test:pull-consumer')
  let i = 0
  const onReadable = () => {
    dbg('readable %d begin', i)
    onData(stream.read())
    dbg('readable %d end', i)
    ++i
  }
  const unsubscribe = () => {
    stream.removeListener('readable', onReadable)
    stream.removeListener('end', unsubscribe)
  }
  stream.on('readable', onReadable)
  stream.on('end', unsubscribe)
  return unsubscribe
}

export const makeDelayPullConsumer = (stream: Readable, onData: (data: string) => void, delayMs = 0) => {
  const dbg = debug('stream-test:pull-consumer')
  let i = 0
  const onReadable = () => {
    dbg('readable %d event', i)
    setTimeout(((i) => () => {
      dbg('readable %d begin', i)
      onData(stream.read())
      dbg('readable %d end', i)
    })(i), delayMs)
    ++i
  }
  const unsubscribe = () => {
    stream.removeListener('readable', onReadable)
    stream.removeListener('end', unsubscribe)
  }
  stream.on('readable', onReadable)
  stream.on('end', unsubscribe)
  return unsubscribe
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
