import ReadWriteStream = NodeJS.ReadWriteStream

export interface PipedStream {
  head: ReadWriteStream
  tail: ReadWriteStream
}

export const isPipedStream = (stream: PipedStream | ReadWriteStream): stream is PipedStream =>
  'head' in stream && 'tail' in stream

export function pipe (...streams: (PipedStream | ReadWriteStream)[]) {
  return streams.reduce((acc, stream): PipedStream => {
    if (isPipedStream(acc)) {
      if (isPipedStream(stream)) {
        acc.tail.pipe(stream.head)
        return {
          head: acc.head,
          tail: stream.tail
        }
      } else {
        acc.tail.pipe(stream)
        return {
          head: acc.head,
          tail: stream
        }
      }
    } else {
      if (isPipedStream(stream)) {
        acc.pipe(stream.head)
        return {
          head: acc,
          tail: stream.tail
        }
      } else {
        acc.pipe(stream)
        return {
          head: acc,
          tail: stream
        }
      }
    }
  })
}
