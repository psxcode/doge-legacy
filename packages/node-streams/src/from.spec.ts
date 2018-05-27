import { expect } from 'chai'
import { dataConsumer, makeNumbers, readableTest } from '@psxcode/node-streams-test'
import from from './from'

xdescribe('[ from ]', () => {
  readableTest(
    makeNumbers(8),
    from({ objectMode: true }),
    dataConsumer,
    (data, spy) => {
      expect(Array.from(data).length).eq(spy.callCount())
    })
})
