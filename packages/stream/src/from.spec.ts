import {
  expectSameCallCount,
  makeMediumRange,
  makeOnDataConsumer,
  makeReadableTest,
  makeSmallRange,
  xmakeReadableTest
} from './helpers/helpers'
import { from } from './from'

describe('[ from ]', function () {
  makeReadableTest(makeMediumRange(),
    from,
    makeOnDataConsumer,
    expectSameCallCount)
})

describe('[ fromRaw ]', function () {
  makeReadableTest(makeMediumRange(),
    from,
    makeOnDataConsumer,
    expectSameCallCount)
})
