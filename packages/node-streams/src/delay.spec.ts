import { expect } from 'chai'
import { makeNumbers, readable, transformTest, wait, writable } from '@psxcode/node-streams-test'
import delay from './delay'

xdescribe('[ delay ]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({ delayMs: 30 })({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => delay(wait, Date.now)(1000),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
