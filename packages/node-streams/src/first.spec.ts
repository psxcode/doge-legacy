import { expect } from 'chai'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import filter from './filter'
import first from './first'
import map from './map'

const isEqual = (value: number) => (arg: number) => value === arg
const multiply = (multiplier: number) => (value: number) => value * multiplier

xdescribe('[ first ]', () => {
  transformTest(
    makeNumbers(8),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => first({ objectMode: true })(),
    (data, spy) => {
      expect(spy.callCount()).eq(1)
      expect(spy.data()).deep.eq(Array.from(data).slice(0, 1))
    })

  transformTest(
    makeNumbers(4),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => [
      filter({ objectMode: true })(isEqual(10)),
      first({ objectMode: true })(),
      map({ objectMode: true })(multiply(2))
    ],
    (data, spy) => {
      expect(spy.callCount()).eq(1)
      expect(spy.data()).deep.eq([20])
    })
})
