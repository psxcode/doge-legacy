import { expect } from 'chai'
import branch from './branch'

describe('[ branch ]', () => {
  it('should work', async () => {
    const br = branch(x => x === 1, (x: number) => x, (x: number) => x * 2)
    expect(br(1)).eq(1)
    expect(br(2)).eq(4)
  })
})
