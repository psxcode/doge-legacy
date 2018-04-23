import { expect } from 'chai'
import empty from './empty'
import { dataConsumer, makeStrings, readableTest } from '@psxcode/node-streams-test'

xdescribe('[ empty ]', () => {
  readableTest(makeStrings(4),
    empty,
    dataConsumer,
    (data, spy) => {
      expect(spy.callCount()).eq(0)
    })
})
