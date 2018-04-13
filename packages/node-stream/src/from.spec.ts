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
  xmakeReadableTest(makeMediumRange(),
    from,
    makeOnDataConsumer,
    expectSameCallCount)
})
