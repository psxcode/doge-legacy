import { expect } from 'chai'
import { makeReadable } from './readable'
import { makeWritable } from './writable'
import {
  expectSameCallCount,
  expectSameData,
  makeSmallRange,
  makeSmallStrings,
  makeTransformTest,
  xmakeTransformTest
} from './test-helpers'
import { iterate, identity } from '@doge/helpers'
import { mapStream, filterStream, reduceStream } from './transform'

const multiply = (multiplier: number) => (value: number) => value * multiplier
const isEven = (value: number) => value % 2 === 0
const addAll = (acc = 0, value: number) => acc + value

describe('[ transform ]', function () {
  describe('[ map ]', function () {
    xmakeTransformTest<string>(makeSmallStrings(6),
      (data) => makeReadable({})({ encoding: 'utf8' })(iterate(data)),
      (spy) => makeWritable({})({ decodeStrings: false })(spy),
      () => mapStream({})(identity),
      expectSameCallCount)

    const smallNumbers = makeSmallRange(4)
    xmakeTransformTest<number>(smallNumbers,
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => mapStream({ objectMode: true })(multiply(2)),
      (data, spy) => {
        expect(spy.data()).deep.eq(Array.from(data).map(multiply(2)))
      })
  })

  describe('[ filter ]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => filterStream({ objectMode: true })(isEven),
      (data, spy) => {
        expect(spy.data()).deep.eq(Array.from(data).filter(isEven))
      })
  })

  describe('[ reduce ]', function () {
    makeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => reduceStream({ objectMode: true })(addAll),
      (data, spy) => {
        expect(spy.data()).deep.eq([Array.from(data).reduce(addAll)])
      })
  })
})
