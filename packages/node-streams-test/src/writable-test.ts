import { makeDataSpy, SpyFn } from './spy'
import wait from './wait'
import waitForEvents from './wait-for-events'
import WritableStream = NodeJS.WritableStream

const writableTest = <T> (
  data: Iterable<T>,
  makeWritable: (spy: (data: T) => void) => WritableStream,
  makeProducer: (stream: WritableStream, data: Iterable<T>) => () => void,
  expectFn?: (data: Iterable<T>, spy: SpyFn<T>) => void) =>
  it('should work', async () => {
    const spy = makeDataSpy<T>()
    const stream = makeWritable(spy)
    const producer = makeProducer(stream, data)
    await wait(100)
    producer()
    await waitForEvents('end', 'error')(stream)
    await wait(20)
    expectFn && expectFn(data, spy)
  })

export default writableTest
