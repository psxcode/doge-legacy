import { expect } from 'chai'
import { iterate } from '@doge/iterable'
import { makeReadable } from './helpers/readable'
import { concat } from './concat'
import { makeOnDataConsumer, makeReadableTest, xmakeReadableTest } from './helpers/helpers'

describe('[ concat ]', function () {
  xmakeReadableTest([0, 1, 2, 3, 4],
    (data) => {
      const s1 = makeReadable({ delayMs: 50 })({ objectMode: true })(iterate(data))
      const s2 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate(data))
      return concat(s1, s2)
    },
    makeOnDataConsumer,
    (data, spy) => {
      expect(spy.data()).deep.eq([0, 1, 2, 3, 4, 0, 1, 2, 3, 4])
    })
})
