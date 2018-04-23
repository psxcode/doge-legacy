import from from './from'
import { dataConsumer, makeNumbers, readableTest } from '@psxcode/node-streams-test'

xdescribe('[ from ]', () => {
  readableTest(makeNumbers(8),
    from,
    dataConsumer,
    expectSameCallCount)
})
