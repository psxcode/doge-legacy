import { expect } from 'chai'
import scan from './scan'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'

const addAll = (acc = 0, value: number) => acc + value

xdescribe('[ scan ]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => scan(addAll),
    (data, spy) => {
      expect(spy.data()).deep
        .eq(Array.from(data).reduce((acc: number[], val, i) => [...acc, i > 0 ? val + acc[i - 1] : val], []))
    })
})
