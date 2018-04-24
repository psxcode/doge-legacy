import { expect } from 'chai'
import { dataConsumer, makeNumbers, readable, readableTest } from '@psxcode/node-streams-test'
import concat from './concat'

xdescribe('[ concat ]', () => {
  readableTest(makeNumbers(4),
    (data) => {
      const s1 = readable({ delayMs: 50 })({ objectMode: true })(data)
      const s2 = readable({ delayMs: 10 })({ objectMode: true })(data)
      return concat(s1, s2)
    },
    dataConsumer,
    (data, spy) => {
      expect(spy.data()).deep.eq([0, 1, 2, 3, 4, 0, 1, 2, 3, 4])
    })
})
