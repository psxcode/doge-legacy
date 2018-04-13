import { expect } from 'chai'
import constantAsync from './constant-async'

describe('[ constantAsync ]', function () {
  it('should return same value', async function () {
    expect(await constantAsync(42)()).eq(42)
  })
})
