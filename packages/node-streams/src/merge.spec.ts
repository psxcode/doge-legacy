import { expect } from 'chai'
import merge from './merge'
import { dataConsumer, readable, readableTest } from '@psxcode/node-streams-test'

xdescribe('[ merge ]', () => {
  readableTest([0, 1, 2, 3, 4],
    (data) => {
      const s1 = readable({ delayMs: 50 })({ objectMode: true })(data)
      const s2 = readable({ delayMs: 10 })({ objectMode: true })(data)
      return merge(s1, s2)
    },
    dataConsumer,
    (data, spy) => {
      expect(spy.data().length).eq(10)
    })
})
