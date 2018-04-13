import { expect } from 'chai'
import { iterate } from '@doge/iterable'
import { makeReadable } from './helpers/readable'
import { zip } from './zip'
import { makeOnDataConsumer, makeReadableTest, xmakeReadableTest } from './helpers/helpers'

describe('[ zip ]', function () {
  xmakeReadableTest([0, 1, 2, 3, 4],
    (data) => {
      const s1 = makeReadable({ delayMs: 30 })({ objectMode: true })(iterate(data))
      const s2 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate([0, 1, 2, 3, 4, 5, 6]))
      return zip(s1, s2)
    },
    makeOnDataConsumer,
    (data, spy) => {
      expect(spy.data()).deep.eq([[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]])
    })
})
