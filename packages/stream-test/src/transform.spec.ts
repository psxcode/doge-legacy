import { expect } from 'chai'
import { makeReadable } from './readable'
import { makeWritable } from './writable'
import {
  expectSameCallCount,
  expectSameData, makeSmallRange,
  makeSmallStrings,
  makeTransformTest,
  xmakeTransformTest
} from './test-helpers'
import { iterate, identity } from '@doge/helpers'
import { filter, map as transformMap } from './transform'

const multiply = (multiplier: number) => (value: number) => value * multiplier

describe('[ transform ]', function () {
  describe('[ map ]', function () {
    makeTransformTest<string>(makeSmallStrings(6),
      (data) => makeReadable({})({ encoding: 'utf8' })(iterate(data)),
      (spy) => makeWritable({})({ decodeStrings: false })(spy),
      () => transformMap({})(identity),
      expectSameCallCount)

    const smallNumbers = makeSmallRange(4)
    xmakeTransformTest<number>(smallNumbers,
      (data) => makeReadable({})({ objectMode: true })(iterate(data)),
      (spy) => makeWritable({})({ objectMode: true })(spy),
      () => transformMap({ objectMode: true })(multiply(2)),
      (data, spy) => {
        expect(spy.data()).deep.eq(Array.from(data).map(multiply(2)))
      })
  })

  describe('[ filter ]', function () {
  })
})
