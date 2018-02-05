import { expect } from 'chai'
import { iterate } from '@doge/helpers'
import { makeReadable } from './helpers/readable'
import { startWith } from './start-with'
import { makeOnDataConsumer, makeReadableTest, xmakeReadableTest } from './helpers/helpers'

describe('[ concat ]', function () {
  xmakeReadableTest([5, 6, 7, 8, 9],
    (data) => {
      const s1 = makeReadable({ delayMs: 50 })({ objectMode: true })(iterate(data))
      return startWith(0, 1, 2, 3, 4)(s1)
    },
    makeOnDataConsumer,
    (data, spy) => {
      expect(spy.data()).deep.eq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
})
