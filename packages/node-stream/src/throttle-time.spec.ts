import { iterate } from '@psxcode/iterable'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, makeTransformTest, xmakeTransformTest } from './helpers/helpers'
import throttleTime from './throttle-time'

describe('[ throttleTime ]', () => {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({ delayMs: 0 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => throttleTime(30))
})
