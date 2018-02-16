import { expect } from 'chai'
import { gen } from './test-helpers'
import { iterate } from './iterate'

describe('[ iterate ]', function () {
  it('should work with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const result = [...iterate(data)]
    expect(result).deep.eq([1, 2, 3, 4, 5])
  })

  it('should work with Sets', function () {
    const data = new Set([1, 2, 3, 4, 5])
    const result = [...iterate(data)]
    expect(result).deep.eq([1, 2, 3, 4, 5])
  })

  it('should work with Generators', function () {
    const data = gen(5)
    const result = [...iterate(data)]
    expect(result).deep.eq([0, 1, 2, 3, 4])
  })
})
