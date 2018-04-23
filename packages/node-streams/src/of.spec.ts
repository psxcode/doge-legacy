import { expect } from 'chai'
import { dataConsumer, makeNumbers, readableTest } from '@psxcode/node-streams-test'
import of from './of'

xdescribe('[ of ]', () => {
  readableTest<number>(makeNumbers(4),
    (data) => of(...data),
    (readable, sink) => dataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
