import { expect } from 'chai'
import branch from './branch'

describe('[ branch ]', function () {
  it('should work', async function () {
    const br = branch(x => x === 1, (x) => x, (x) => x * 2)
    expect(br(1)).eq(1)
    expect(br(2)).eq(4)
  })
})
