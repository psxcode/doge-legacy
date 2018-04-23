import { expect } from 'chai'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import filter from './filter'

const isEven = (value: number) => value % 2 === 0

xdescribe('[ filter ]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => filter(isEven),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data).filter(isEven))
    })
})
