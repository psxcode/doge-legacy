import { expect } from 'chai'
import {
  expectSameCallCount,
  makeOnDataConsumer,
  makeSmallStrings,
  xmakeReadableTest,
  makeReadableTest
} from './helpers/helpers'
import { empty } from './empty'

describe('[ empty ]', function () {
  xmakeReadableTest(makeSmallStrings(3),
    empty,
    makeOnDataConsumer,
    (data, spy) => {
      expect(spy.callCount()).eq(0)
    })
})
