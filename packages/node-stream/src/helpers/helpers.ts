/* tslint:disable no-conditional-assignment no-empty */
import * as debug from 'debug'
import { EventEmitter } from 'events'
import { expect } from 'chai'
import { waitTimePromise as wait } from '@doge/wait'
import { bind } from '@doge/arity'
import { onceRacePromise } from '../events'
import { pipe, PipedStream } from '../pipe'
import ReadableStream = NodeJS.ReadableStream
import WritableStream = NodeJS.WritableStream
import ReadWriteStream = NodeJS.ReadWriteStream

export const waitForEnd = (ee: EventEmitter, waitAfterMs = 0) =>
  onceRacePromise('end', 'finish')(ee).then(() => wait(waitAfterMs))

export const waitForError = (ee: EventEmitter, waitAfterMs = 0) =>
  onceRacePromise('error')(ee).then(() => wait(waitAfterMs))

export const waitForEndOrError = (ee: EventEmitter, waitAfterMs = 0) =>
  onceRacePromise('end', 'finish', 'error')(ee).then(() => wait(waitAfterMs))

export const isPositiveNumber = (num: any): num is number => {
  return num && isFinite(num) && num >= 0
}

export interface SpyFn<T> {
  (data?: T): void
  callCount (): number
  data (): T[]
}

export const makeSpy = <T> (name: string, message: string): SpyFn<T> => {
  let i = 0
  let data: T[] = []
  const dbg = debug(`stream-test:event-spy:${name}`)
  const spy = (value?: T) => {
    dbg(message, i, value)
    value != null && data.push(value)
    ++i
  }
  (spy as SpyFn<T>).callCount = () => i;
  (spy as SpyFn<T>).data = () => data
  return (spy as SpyFn<T>)
}

export const makeDataSpy = <T> () => makeSpy<T>('data', 'consume %d, value %s')

export const makeErrorSpy = <T> () => makeSpy<T>('error', 'error event #%d received')

export const makeEndSpy = <T> () => makeSpy<T>('end', 'end event received')

export interface IReadableConsumer {
  delayMs?: number,
  readSize?: number,
  eager?: boolean
}

export const makeOnReadableConsumer = <T> (stream: ReadableStream,
                                           sink: (data: T) => void,
                                           { delayMs, readSize, eager }: IReadableConsumer) => {
  const dbg = debug('stream-test:readable-consumer')
  let i = 0
  const eagerReader = (i: number) => {
    let chunk: T
    dbg('eager read at %d begin', i)
    while (chunk = stream.read(readSize) as any) sink(chunk)
    dbg('eager read at %d done', i)
  }
  const lazyReader = (i: number) => {
    let chunk: T
    dbg('lazy read at %d begin', i);
    (chunk = stream.read() as any) && sink(chunk)
    dbg('lazy read at %d done', i)
  }
  const asyncHandler = () => {
    dbg('received \'readable\' event at %d', i)
    wait(delayMs as number).then(eager
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
    stream.on('readable', isPositiveNumber(delayMs)
      ? asyncHandler
      : syncHandler)
    stream.once('end', unsubscribe)
    return unsubscribe
  }
}

export const makeOnDataConsumer = <T> (stream: ReadableStream, sink: (data: T) => void) => {
  const dbg = debug('stream-test:data-consumer')
  let i = 0
  const onDataEvent = (chunk: T) => {
    dbg('received \'data\' event at %d', i)
    sink(chunk)
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

export interface IWritableProducer {
  eager?: boolean
}

export const makeWritableProducer = ({ eager }: IWritableProducer = {}) =>
  <T> (iterator: Iterator<T>, maxLength = 0) => (stream: WritableStream) => {
    const dbg = debug('stream-test:data-producer')
    let i = 0
    const eagerWriter = () => {
      dbg('eager writing begin at %d', i)
      while (writeChunk(iterator.next())) {
        ++i
      }
      dbg('eager writing done at %d', i - 1)
    }
    const lazyWriter = () => {
      dbg('lazy writing begin at %d', i)
      writeChunk(iterator.next(), lazyWriter)
      dbg('lazy writing done at %d', i - 1)
    }
    const writeChunk = (iteratorResult: IteratorResult<T>, cb?: () => void): boolean => {
      if (iteratorResult.done || (maxLength > 0 && i >= maxLength)) {
        dbg('ending %d', i)
        stream.end()
        return false
      } else {
        dbg('writing %d', i)
        const backpressure = stream.write(iteratorResult.value as any, cb)
        if (!backpressure) {
          dbg('backpressure at %d', i)
        }
        return backpressure
      }
    }
    const onDrainEvent = () => {
      dbg('received \'drain\' event %d', i)
      eager ? eagerWriter() : lazyWriter()
    }
    const unsubscribe = () => {
      dbg('unsubscribe')
      stream.removeListener('drain', onDrainEvent)
      stream.removeListener('finish', unsubscribe)
    }

    return () => {
      dbg('producer subscribe')
      stream.on('drain', onDrainEvent)
      stream.once('finish', unsubscribe)
      /* drain event could already be emitted, try to write once */
      eager ? eagerWriter() : lazyWriter()
      return unsubscribe
    }
  }

export const makeStringsIterable = (initialRepeat: number) => (repeat = 1): Iterable<string> => ({
  * [Symbol.iterator] () {
    for (let i = 0; i < initialRepeat * repeat; ++i) {
      yield '#' + `${i}`.padStart(7, '0')
    }
  }
})
export const makeSmallStrings = makeStringsIterable(4)
export const makeMediumStrings = makeStringsIterable(64)
export const makeLargeStrings = makeStringsIterable(256)

export const makeRangeIterable = (initialRange: number) => (multiplier: number = 1): Iterable<number> => ({
  * [Symbol.iterator] () {
    for (let i = 0; i < initialRange * multiplier; ++i) {
      yield i
    }
  }
})

export const makeSmallRange = makeRangeIterable(4)
export const makeMediumRange = makeRangeIterable(64)
export const makeLargeRange = makeRangeIterable(256)

export const makeReadableTest = <T> (data: Iterable<T>,
                                     makeReadable: (data: Iterable<T>) => ReadableStream,
                                     makeConsumer: (stream: ReadableStream, sink: (data: T) => void) => () => any,
                                     expectFn?: (data: Iterable<T>, spy: SpyFn<T>) => void) => {
  return it('should work', async function () {
    const spy = makeDataSpy<T>()
    const stream = makeReadable(data)
    const consumer = makeConsumer(stream, spy)
    await wait(100)
    consumer()
    await waitForEndOrError(stream, 10)
    expectFn && expectFn(data, spy)
  })
}

export const xmakeReadableTest = <T> (data: Iterable<T>,
                                      makeReadable: (data: Iterable<T>) => ReadableStream,
                                      makeConsumer: (stream: ReadableStream, spy: (data: T) => void) => () => any,
                                      expectFn?: (data: Iterable<T>, spy: SpyFn<T>) => void) => {
  return void 0
}

export const makeWritableTest = <T> (data: Iterable<T>,
                                     makeWritable: (spy: (data: T) => void) => WritableStream,
                                     makeProducer: (stream: WritableStream, data: Iterable<T>) => () => void,
                                     expectFn?: (data: Iterable<T>, spy: SpyFn<T>) => void) => {
  return it('should work', async function () {
    const spy = makeDataSpy<T>()
    const stream = makeWritable(spy)
    const producer = makeProducer(stream, data)
    await wait(100)
    producer()
    await waitForEndOrError(stream, 10)
    expectFn && expectFn(data, spy)
  })
}

export const xmakeWritableTest = <T> (data: Iterable<T>,
                                      makeWritable: (spy: (data: T) => void) => WritableStream,
                                      makeProducer: (stream: WritableStream, data: Iterable<T>) => () => void,
                                      expectFn?: (data: Iterable<T>, spy: SpyFn<T>) => void) => {
  return void 0
}

export const makeTransformTest = <T> (data: Iterable<T>,
                                      makeReadable: (data: Iterable<T>) => ReadableStream,
                                      makeWritable: (sink: (data: T) => void) => WritableStream,
                                      makeTransform: () => ReadWriteStream | PipedStream,
                                      expectFn?: (data: Iterable<T>, spy: SpyFn<T>) => void) => {
  return it('should work', async function () {
    const readable = makeReadable(data)
    const spy = makeDataSpy<T>()
    const writable = makeWritable(spy)
    const transform = makeTransform()
    await wait(100)
    const stream = pipe(readable as ReadWriteStream, transform, writable as ReadWriteStream)
    await waitForEndOrError(stream.tail, 10)
    expectFn && expectFn(data, spy)
  })
}

export const xmakeTransformTest = <T> (data: Iterable<T>,
                                      makeReadable: (data: Iterable<T>) => ReadableStream,
                                      makeWritable: (spy: (data: T) => void) => WritableStream,
                                      makeTransform: () => ReadWriteStream | PipedStream,
                                      expectFn?: (data: Iterable<T>, spy: SpyFn<T>) => void) => {
  return void 0
}

export const concatStrings = (iterable: Iterable<string> | string[]): string => {
  return Array.from(iterable).join('')
}

export const expectSameData = (data: Iterable<string>, spy: SpyFn<string>) => {
  expect(concatStrings(spy.data())).deep.eq(concatStrings(data))
}
export const expectSameCallCount = (data: Iterable<string>, spy: SpyFn<string>) => {
  const arr = Array.from(data)
  expect(spy.data()).deep.eq(arr)
  expect(spy.callCount()).eq(arr.length)
}
