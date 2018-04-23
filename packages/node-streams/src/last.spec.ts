import { expect } from 'chai'
import filter from './filter'
import last from './last'
import map from './map'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'

const isEqual = (value: number) => (arg: number) => value === arg
const multiply = (multiplier: number) => (value: number) => value * multiplier

xdescribe('[ last ]', () => {
  transformTest<number>(makeNumbers(4),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => [filter(isEqual(10)), last(), map(multiply(2))],
    (data, spy) => {
      expect(spy.data()).deep.eq([20])
    })
})
