import { expect } from 'chai'
import {
  makeOnDataConsumer, makeOnReadableConsumer,
  makeReadableTest,
  makeSmallRange,
  makeSmallStrings,
  xmakeReadableTest
} from './helpers/helpers'
import { of, ofRaw } from './of'

describe('[ of ]', function () {
  xmakeReadableTest<number>(makeSmallRange(),
    (data) => of(...data),
    (readable, sink) => makeOnDataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})

describe('[ ofRaw ]', function () {
  xmakeReadableTest(makeSmallStrings(),
    (data) => ofRaw(...data),
    (readable, sink) => makeOnReadableConsumer(readable, sink, {}),
    (data, spy) => {
      expect(spy.data().join('')).deep.eq(Array.from(data).join(''))
    })
})
