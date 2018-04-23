import { expect } from 'chai'
import { dataConsumer, makeStrings, readableTest } from '@psxcode/node-streams-test'
import empty from './empty'

xdescribe('[ empty ]', () => {
  readableTest(makeStrings(4),
    empty,
    dataConsumer,
    (data, spy) => {
      expect(spy.callCount()).eq(0)
    })
})
