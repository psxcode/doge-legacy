import { expect } from 'chai'
import { dataConsumer, makeNumbers, readableTest } from '@psxcode/node-streams-test'
import ofTime from './of-time'

xdescribe('[ ofTime ]', () => {
  readableTest<number>(makeNumbers(4),
    (data) => ofTime(30)(...data),
    (readable, sink) => dataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
