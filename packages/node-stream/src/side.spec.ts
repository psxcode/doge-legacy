import { expect } from 'chai'
import { iterate } from '@psxcode/iterable'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import {
  expectSameCallCount,
  makeSmallRange,
  makeSmallStrings,
  xmakeTransformTest
} from './helpers/helpers'
import side from './side'

const multiply = (multiplier: number) => (value: number) => value * multiplier

describe('[ side ]', () => {
  xmakeTransformTest<string>(makeSmallStrings(6),
    (data) => makeReadable({})({ encoding: 'utf8' })(iterate(data)),
    (spy) => makeWritable({})({ decodeStrings: false })(spy),
    () => side(x => x),
    expectSameCallCount)

  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({})({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => side(multiply(2)),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
