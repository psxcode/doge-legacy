import { expect } from 'chai'
import { gen } from './test-helpers'
import { length } from './length'

describe('[ length ]', function () {
  it('should work with arrays', function () {
    const data = [1, 2, 3, 4, 5]
    const result = length()(data)
    expect(result).eq(data.length)
  })

  it('should work with maxLength', function () {
    const data = [1, 2, 3, 4, 5]
    const result = length(2)(data)
    expect(result).eq(2)
  })

  it('should work negative maxLength', function () {
    const data = [1, 2, 3, 4, 5]
    const result = length(-2)(data)
    expect(result).eq(data.length)
  })

  it('should work maxLength === 0', function () {
    const data = [1, 2, 3, 4, 5]
    const result = length(0)(data)
    expect(result).eq(0)
  })

  it('should work with Sets', function () {
    const data = new Set([1, 2, 3, 4, 5])
    const result = length()(data)
    expect(result).eq(5)
  })

  it('should work with Generators', function () {
    const data = gen(5)
    const result = length()(data)
    expect(result).eq(5)
  })
})
