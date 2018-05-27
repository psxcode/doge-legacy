import { expect } from 'chai'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import pipe from './pipe'
import filter from './filter'
import map from './map'
import first from './first'

const isEqual = (value: number) => (arg: number) => value === arg
const multiply = (multiplier: number) => (value: number) => value * multiplier

xdescribe('[ pipe ]', () => {
  transformTest<number>(makeNumbers(4),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => pipe(
      filter({ objectMode: true })(isEqual(10)),
      first({ objectMode: true })(),
      map({ objectMode: true })(multiply(2))
    ),
    (data, spy) => {
      expect(spy.callCount()).eq(1)
      expect(spy.data()).deep.eq([20])
    })
})
