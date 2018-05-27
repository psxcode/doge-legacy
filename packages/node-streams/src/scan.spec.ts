import { expect } from 'chai'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import scan from './scan'

const addAll = (acc = 0, value: number) => acc + value

xdescribe('[ scan ]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => scan({ objectMode: true })(addAll),
    (data, spy) => {
      expect(spy.data()).deep.eq(
        Array.from(data).reduce((acc: number[], val, i) => [...acc, i > 0 ? val + acc[i - 1] : val], [])
      )
    })
})
