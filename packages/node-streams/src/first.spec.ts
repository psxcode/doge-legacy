import { expect } from 'chai'
import filter from './filter'
import first from './first'
import map from './map'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'

const isEqual = (value: number) => (arg: number) => value === arg
const multiply = (multiplier: number) => (value: number) => value * multiplier

xdescribe('[ first ]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => first(),
    (data, spy) => {
      expect(spy.callCount()).eq(1)
      expect(spy.data()).deep.eq(Array.from(data).slice(0, 1))
    })

  transformTest<number>(makeNumbers(4),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => [filter(isEqual(10)), first(), map(multiply(2))],
    (data, spy) => {
      expect(spy.callCount()).eq(1)
      expect(spy.data()).deep.eq([20])
    })
})
