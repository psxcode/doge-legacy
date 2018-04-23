import { expect } from 'chai'
import zip from './zip'
import { dataConsumer, readable, readableTest } from '@psxcode/node-streams-test'

xdescribe('[ zip ]', () => {
  readableTest([0, 1, 2, 3, 4],
    (data) => {
      const s1 = readable({ delayMs: 30 })({ objectMode: true })(data)
      const s2 = readable({ delayMs: 10 })({ objectMode: true })([0, 1, 2, 3, 4, 5, 6])
      return zip(s1, s2)
    },
    dataConsumer,
    (data, spy) => {
      expect(spy.data()).deep.eq([[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]])
    })
})
