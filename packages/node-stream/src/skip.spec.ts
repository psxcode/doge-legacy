import { expect } from 'chai'
import { iterate } from '@psxcode/iterable'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, xmakeTransformTest } from './helpers/helpers'
import skip from './skip'

describe('[ skip ]', () => {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({})({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => skip(5),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data).slice(5))
    })
})
