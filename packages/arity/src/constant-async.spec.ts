import { expect } from 'chai'
import constantAsync from './constant-async'

describe('[ constantAsync ]', () => {
  it('should return same value', async () => {
    expect(await constantAsync(42)()).eq(42)
  })
})
