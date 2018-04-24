import { expect } from 'chai'
import identityAsync from './identity-async'

describe('[ identityAsync ]', () => {
  it('should return same value', async () => {
    expect(await identityAsync(42)).eq(42)
  })
})
