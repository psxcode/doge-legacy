import { expect } from 'chai'
import constant from './constant'

describe('[ constant ]', function () {
  it('should return same value', function () {
    expect(constant(42)()).eq(42)
  })
})
