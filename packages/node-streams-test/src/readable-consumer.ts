/* tslint:disable no-conditional-assignment no-empty */
import * as debug from 'debug'
import isPositiveNumber from './is-positive-number'
import ReadableStream = NodeJS.ReadableStream

export interface IReadableConsumer {
  delayMs?: number,
  readSize?: number,
  eager?: boolean
}

const readableConsumer = <T> (
  stream: ReadableStream,
  sink: (data: T) => void,
  { delayMs, readSize, eager }: IReadableConsumer
) => {
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
    setTimeout(eager
      ? eagerReader.bind(null, i)
      : lazyReader.bind(null, i),
      delayMs as number)
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

export default readableConsumer
