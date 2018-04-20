import { expect } from 'chai'
import {
  makeOnDataConsumer,
  makeOnReadableConsumer,
  makeReadableTest,
  makeSmallRange,
  makeSmallStrings,
  xmakeReadableTest
} from './helpers/helpers'
import of from './of'

describe('[ of ]', () => {
  xmakeReadableTest<number>(makeSmallRange(),
    (data) => of(...data),
    (readable, sink) => makeOnDataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
