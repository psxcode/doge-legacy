import { expect } from 'chai'
import { iterate } from '@psxcode/iterable'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, xmakeTransformTest } from './helpers/helpers'
import filter from './filter'

const isEven = (value: number) => value % 2 === 0

describe('[ filter ]', () => {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({})({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => filter(isEven),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data).filter(isEven))
    })
})
