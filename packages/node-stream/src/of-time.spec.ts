import { expect } from 'chai'
import {
  makeOnDataConsumer,
  makeOnReadableConsumer,
  makeReadableTest,
  makeSmallRange,
  makeSmallStrings,
  xmakeReadableTest
} from './helpers/helpers'
import ofTime from './of'

describe('[ ofTime ]', () => {
  xmakeReadableTest<number>(makeSmallRange(),
    (data) => ofTime(30)(...data),
    (readable, sink) => makeOnDataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
