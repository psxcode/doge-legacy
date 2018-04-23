import { expect } from 'chai'
import { readable, transformTest, writable } from '@psxcode/node-streams-test'
import filter from './filter'
import first from './first'
import pluck from './pluck'
import map from './map'

const isEqual = (value: number) => (arg: number) => value === arg
const multiply = (multiplier: number) => (value: number) => value * multiplier
const makeNumbers = (length: number): Iterable<{ value: number }> => ({
  * [Symbol.iterator] () {
    for (let i = 0; i < length; ++i) {
      yield { value: i }
    }
  }
})

xdescribe('[ pluck ]', () => {
  transformTest(makeNumbers(8),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => [pluck('value'), filter(isEqual(10)), first(), map(multiply(2))],
    (data, spy) => {
      expect(spy.callCount()).eq(1)
      expect(spy.data()).deep.eq([20])
    })
})
