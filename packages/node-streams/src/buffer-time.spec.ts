import { iterate } from '@psxcode/iterable'
import { makeWritable } from '../../node-streams-test/src/writable'
import { makeReadable } from '../../node-streams-test/src/readable'
import { makeSmallRange, makeTransformTest, xmakeTransformTest } from '../../node-streams-test/src/helpers'
import bufferTime from './buffer-time'

describe('[ bufferTime ]', () => {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({ delayMs: 5 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => bufferTime(30))
})
