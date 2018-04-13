import { expect } from 'chai'
import identity from './identity'

describe('[ identity ]', function () {
  it('should return same value', function () {
    expect(identity(42)).eq(42)
  })
})
