import { expect } from 'chai'
import { dataConsumer, makeNumbers, readable, readableTest } from '@psxcode/node-streams-test'
import zip from './zip'

xdescribe('[ zip ]', () => {
  readableTest(makeNumbers(5),
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
