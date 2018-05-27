import { expect } from 'chai'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import take from './take'

describe.skip('[ take ]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => take({ objectMode: true })(5),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data).slice(0, 5))
    })
})
