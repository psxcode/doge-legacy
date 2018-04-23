import { dataConsumer, makeNumbers, readableTest } from '@psxcode/node-streams-test'
import from from './from'

xdescribe('[ from ]', () => {
  readableTest(makeNumbers(8),
    from,
    dataConsumer,
    expectSameCallCount)
})
