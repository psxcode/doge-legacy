import { expect } from 'chai'
import identity from './identity'

describe('[ identity ]', () => {
  it('should return same value', () => {
    expect(identity(42)).eq(42)
  })
})
