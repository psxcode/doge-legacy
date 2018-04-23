import { expect } from 'chai'
import map from './map'
import {
  makeNumbers,
  makeStrings,
  readable,
  transformTest,
  writable
} from '@psxcode/node-streams-test'

const multiply = (multiplier: number) => (value: number) => value * multiplier
const identity = <T> (x: T) => x

xdescribe('[ map ]', () => {
  transformTest<string>(makeStrings(6),
    (data) => readable({})({ encoding: 'utf8' })(data),
    (spy) => writable({})({ decodeStrings: false })(spy),
    () => map(identity),
    expectSameCallCount)

  transformTest<number>(makeNumbers(4),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => map(multiply(2)),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data).map(multiply(2)))
    })
})
