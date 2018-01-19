import { expect } from 'chai'
import {
  makeMediumStrings,
  makeSmallStrings,
  makeWritableProducer,
  makeWritableTest, SpyFn,
  xmakeWritableTest
} from './test-helpers'
import { makeWritable } from './writable'

const expectSameData = <T> (data: T[], spy: SpyFn<T>) => {
  expect(spy.data().join('')).deep.eq(data.join(''))
}
const expectSameCallCount = <T> (data: T[], spy: SpyFn<T>) => {
  expect(spy.data()).deep.eq(data)
  expect(spy.callCount()).eq(data.length)
}

describe('', function () {
  this.slow(1000)

  makeWritableTest(makeMediumStrings(),
    (spy) => makeWritable({ writeDelayMs: 10 })(spy, { highWaterMark: 256 }),
    (stream, data) => makeWritableProducer(stream, data, { eager: true }),
    expectSameCallCount)
})
