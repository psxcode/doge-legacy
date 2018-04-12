import { expect } from 'chai'
import unshift from './unshift'

describe('[ unshift ]', function () {
  it('should work', function () {
    const data = [1, 2, 3, 4, 5]
    const res = unshift.call(data, 42)
    expect(data).deep.eq([2, 3, 4, 5, 42])
    expect(res).eq(1)
  })
})
