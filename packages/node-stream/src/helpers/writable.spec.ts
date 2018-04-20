import {
  expectSameCallCount,
  makeMediumStrings,
  makeSmallStrings,
  makeWritableProducer,
  makeWritableTest,
  xmakeWritableTest
} from './helpers'
import { makeWritable } from './writable'
import { iterate } from '@psxcode/iterable'

describe('[ writable ]', function () {
  this.slow(1000)

  xmakeWritableTest(makeMediumStrings(),
    (spy) => makeWritable({ delayMs: 10 })({ highWaterMark: 256, decodeStrings: false })(spy),
    (stream, data) => makeWritableProducer({ eager: true })(iterate(data))(stream),
    expectSameCallCount)
})
