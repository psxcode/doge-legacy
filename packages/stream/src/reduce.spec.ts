import { expect } from 'chai'
import { iterate } from '@doge/helpers'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, xmakeTransformTest } from './helpers/helpers'
import { reduce } from './reduce'

const addAll = (acc = 0, value: number) => acc + value

describe('[ reduce ]', function () {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({})({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => reduce(addAll),
    (data, spy) => {
      expect(spy.data()).deep.eq([Array.from(data).reduce(addAll)])
    })
})
