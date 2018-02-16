import { expect } from 'chai'
import { identity } from '@doge/helpers'
import { iterate } from '@doge/iterable'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import {
  expectSameCallCount,
  makeSmallRange,
  makeSmallStrings,
  xmakeTransformTest
} from './helpers/helpers'
import { map } from './map'

const multiply = (multiplier: number) => (value: number) => value * multiplier

describe('[ map ]', function () {
  xmakeTransformTest<string>(makeSmallStrings(6),
    (data) => makeReadable({})({ encoding: 'utf8' })(iterate(data)),
    (spy) => makeWritable({})({ decodeStrings: false })(spy),
    () => map(identity),
    expectSameCallCount)

  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({})({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => map(multiply(2)),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data).map(multiply(2)))
    })
})
