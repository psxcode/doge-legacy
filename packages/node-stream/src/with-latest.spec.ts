import { expect } from 'chai'
import { iterate } from '@psxcode/iterable'
import { makeReadable } from './helpers/readable'
import withLatest from './with-latest'
import {
  makeOnDataConsumer,
  makeReadableTest,
  makeSmallRange,
  xmakeReadableTest
} from './helpers/helpers'

describe('[ withLatest ]', () => {
  xmakeReadableTest(makeSmallRange(2),
    (data) => {
      const s1 = makeReadable({ delayMs: 5 })({ objectMode: true })(iterate(data))
      const s2 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate(data))
      const s3 = makeReadable({ delayMs: 50, eager: true })({ objectMode: true })(iterate(data))
      return withLatest(s2, s3)(s1)
    },
    makeOnDataConsumer,
    (data, spy) => {
      expect(spy.data().length).eq(Array.from(data).length)
    })
})
