import { expect } from 'chai'
import { iterate } from '@psxcode/iterable'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, xmakeTransformTest } from './helpers/helpers'
import scan from './scan'

const addAll = (acc = 0, value: number) => acc + value

describe('[ scan ]', () => {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({})({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => scan(addAll),
    (data, spy) => {
      expect(spy.data()).deep
        .eq(Array.from(data).reduce((acc: number[], val, i) => [...acc, i > 0 ? val + acc[i - 1] : val], []))
    })
})
