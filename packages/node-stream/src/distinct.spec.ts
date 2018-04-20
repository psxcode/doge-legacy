import { expect } from 'chai'
import { iterate } from '@psxcode/iterable'
import { makeReadable } from './helpers/readable'
import { makeWritable } from './helpers/writable'
import { makeTransformTest, xmakeTransformTest } from './helpers/helpers'
import distinct from './distinct'

describe('[ distinct ]', () => {
  const isEqual = <T> (a: T, b: T) => a === b

  xmakeTransformTest<number>([0, 1, 2, 2, 2, 3, 4, 4, 5, 5, 6, 7, 7, 8, 9, 9, 9],
    (data) => makeReadable({ delayMs: 30 })({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => distinct(isEqual),
    (data, spy) => {
      expect(spy.data()).deep.eq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
})
