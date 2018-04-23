import { expect } from 'chai'
import { dataConsumer, makeNumbers, readableTest } from '@psxcode/node-streams-test'
import ofAsync from './of-async'

xdescribe('[ ofAsync ]', () => {
  const interval = (next: () => void) => {
    console.log('subscribe')
    const id = setTimeout(next, 30)
    return () => {
      console.log('clear')
      clearTimeout(id)
    }
  }
  readableTest<number>(makeNumbers(4),
    (data) => ofAsync(interval)(...data),
    (readable, sink) => dataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
