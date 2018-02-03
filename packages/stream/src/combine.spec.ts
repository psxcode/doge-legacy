import { expect } from 'chai'
import { iterate } from '@doge/helpers'
import { makeReadable } from './helpers/readable'
import { combine } from './combine'
import { makeOnDataConsumer, makeReadableTest, xmakeReadableTest } from './helpers/helpers'

describe('[ combine ]', function () {
  xmakeReadableTest([0, 1, 2, 3, 4],
    (data) => {
      const s1 = makeReadable({ delayMs: 12 })({ objectMode: true })(iterate(data))
      const s2 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate(data))
      const s3 = makeReadable({ delayMs: 8 })({ objectMode: true })(iterate(data))
      return combine(s1, s2, s3)
    },
    makeOnDataConsumer,
    (data, spy) => {
      expect(spy.data().length).eq(15)
    })
})
