import { expect } from 'chai'
import identityAsync from './identity-async'

describe('[ identityAsync ]', function () {
  it('should return same value', async function () {
    expect(await identityAsync(42)).eq(42)
  })
})
