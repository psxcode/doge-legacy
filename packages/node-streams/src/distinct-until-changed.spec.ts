import { expect } from 'chai'
import { readable, transformTest, writable } from '@psxcode/node-streams-test'
import distinctUntilChanged from './distinct-until-changed'

xdescribe('[ distinct ]', () => {
  transformTest<number>([0, 1, 2, 2, 2, 3, 4, 4, 5, 5, 6, 7, 7, 8, 9, 9, 9],
    (data) => readable({ delayMs: 30 })({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => distinctUntilChanged(),
    (data, spy) => {
      expect(spy.data()).deep.eq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
})
