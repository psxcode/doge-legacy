import { expect } from 'chai'
import { identity, identityAsync } from './identity'

describe('[ identity ]', function () {
  it('should return same value', function () {
    expect(identity(42)).eq(42)
  })
})

describe('[ identityAsync ]', function () {
  it('should return same value', async function () {
    expect(await identityAsync(42)).eq(42)
  })
})
