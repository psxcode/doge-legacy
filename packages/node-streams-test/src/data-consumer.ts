import * as debug from 'debug'
import ReadableStream = NodeJS.ReadableStream

const dataConsumer = <T> (stream: ReadableStream, sink: (data: T) => void) => {
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

export default dataConsumer
