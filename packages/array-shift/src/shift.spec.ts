import { expect } from 'chai'
import shift from './shift'

describe('[ shift ]', () => {
  it('should work', () => {
    const data = [1, 2, 3, 4, 5]
    const res = shift.call(data, 42)
    expect(data).deep.eq([42, 1, 2, 3, 4])
    expect(res).eq(5)
  })
})
