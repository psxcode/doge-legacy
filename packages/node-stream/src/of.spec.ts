import { expect } from 'chai'
import {
  makeOnDataConsumer,
  makeOnReadableConsumer,
  makeReadableTest,
  makeSmallRange,
  makeSmallStrings,
  xmakeReadableTest
} from './helpers/helpers'
import { of, ofAsync, ofTime } from './of'

describe('[ of ]', function () {
  xmakeReadableTest<number>(makeSmallRange(),
    (data) => of(...data),
    (readable, sink) => makeOnDataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})

describe('[ ofAsync ]', function () {
  const interval = (next: () => void) => {
    console.log('subscribe')
    const id = setTimeout(next, 30)
    return () => {
      console.log('clear')
      clearTimeout(id)
    }
  }
  xmakeReadableTest<number>(makeSmallRange(),
    (data) => ofAsync(interval)(...data),
    (readable, sink) => makeOnDataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})

describe('[ ofTime ]', function () {
  xmakeReadableTest<number>(makeSmallRange(),
    (data) => ofTime(30)(...data),
    (readable, sink) => makeOnDataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
