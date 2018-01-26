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
import { map, filter, reduce, first, last, take, skip, scan } from './transform'
import { pipe } from './pipe'

const multiply = (multiplier: number) => (value: number) => value * multiplier
const isEven = (value: number) => value % 2 === 0
const isEqual = (value: number) => (arg: number) => value === arg
const addAll = (acc = 0, value: number) => acc + value

describe('[ transform ]', function () {
  describe('[ map ]', function () {
    xmakeTransformTest<string>(makeSmallStrings(6),
      (data) => makeReadable({})({ encoding: 'utf8' })(iterate(data)),
      (spy) => makeWritable({})({ decodeStrings: false })(spy),
      () => map(identity),
      expectSameCallCount)

    const smallNumbers = makeSmallRange(4)
    xmakeTransformTest<number>(smallNumbers,
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => map(multiply(2)),
      (data, spy) => {
        expect(spy.data()).deep.eq(Array.from(data).map(multiply(2)))
      })
  })

  describe('[ filter ]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => filter(isEven),
      (data, spy) => {
        expect(spy.data()).deep.eq(Array.from(data).filter(isEven))
      })
  })

  describe('[ reduce ]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => reduce(addAll),
      (data, spy) => {
        expect(spy.data()).deep.eq([Array.from(data).reduce(addAll)])
      })
  })

  describe('[ scan ]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => scan(addAll),
      (data, spy) => {
        expect(spy.data()).deep
          .eq(Array.from(data).reduce((acc: number[], val) => [...acc, val + acc.reduce(addAll, 0)], []))
      })
  })

  describe('[ first ]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => first(),
      (data, spy) => {
        expect(spy.data()).deep.eq(Array.from(data).slice(0, 1))
      })

    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => pipe(filter(isEqual(10)), first(), map(multiply(2))),
      (data, spy) => {
        expect(spy.data()).deep.eq([20])
      })
  })

  describe('[ last ]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => pipe(filter(isEqual(10)), last(), map(multiply(2))),
      (data, spy) => {
        expect(spy.data()).deep.eq([20])
      })
  })

  describe('[ take ]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => take(5),
      (data, spy) => {
        expect(spy.data()).deep.eq(Array.from(data).slice(0, 5))
      })
  })

  describe('[ skip ]', function () {
    xmakeTransformTest<number>(makeSmallRange(4),
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => skip(5),
      (data, spy) => {
        expect(spy.data()).deep.eq(Array.from(data).slice(5))
      })
  })
})
