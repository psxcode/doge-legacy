import ReadWriteStream = NodeJS.ReadWriteStream

export interface PipedStream {
  head: ReadWriteStream
  tail: ReadWriteStream
}

export const isPipedStream = (stream: PipedStream | ReadWriteStream): stream is PipedStream =>
  'head' in stream && 'tail' in stream

export function pipe (stream: PipedStream | ReadWriteStream,
                      ...streams: (PipedStream | ReadWriteStream)[]): PipedStream {
  const initial: PipedStream = isPipedStream(stream) ? stream : { head: stream, tail: stream }
  return streams.reduce((acc: PipedStream, stream) => {
    if (isPipedStream(stream)) {
      acc.tail.pipe(stream.head)
      acc.tail = stream.tail
    } else {
      acc.tail.pipe(stream)
      acc.tail = stream
    }
    return acc
  }, initial) as PipedStream
}
