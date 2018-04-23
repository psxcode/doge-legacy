import { expect } from 'chai'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import skip from './skip'

xdescribe('[ skip ]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => skip(5),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data).slice(5))
    })
})
