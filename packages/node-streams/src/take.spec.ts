import { expect } from 'chai'
import take from './take'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'

describe.skip('[ take ]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => take(5),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data).slice(0, 5))
    })
})
