import { expect } from 'chai'
import ofTime from './of-time'
import { dataConsumer, makeNumbers, readableTest } from '@psxcode/node-streams-test'

xdescribe('[ ofTime ]', () => {
  readableTest<number>(makeNumbers(4),
    (data) => ofTime(30)(...data),
    (readable, sink) => dataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
