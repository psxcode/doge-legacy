import { expect } from 'chai'
import { iterate } from '@psxcode/iterable'
import { makeReadable } from './helpers/readable'
import merge from './merge'
import { makeOnDataConsumer, makeReadableTest, xmakeReadableTest } from './helpers/helpers'

describe('[ merge ]', () => {
  xmakeReadableTest([0, 1, 2, 3, 4],
    (data) => {
      const s1 = makeReadable({ delayMs: 50 })({ objectMode: true })(iterate(data))
      const s2 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate(data))
      return merge(s1, s2)
    },
    makeOnDataConsumer,
    (data, spy) => {
      expect(spy.data().length).eq(10)
    })
})
