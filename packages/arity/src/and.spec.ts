import { expect } from 'chai'
import and from './and'

describe('[ and ]', () => {
  it('should work', async () => {
    const pred = and((x: number) => x === 1, (x: number) => x !== 1)
    expect(pred(1)).eq(false)
  })

  it('should work', async () => {
    const pred = and((x: number) => x === 1, () => true)
    expect(pred(1)).eq(true)
  })

  it('should work', async () => {
    const pred = and((x: number) => x === 1, (x: number) => !!x && x > 0)
    expect(pred(1)).eq(true)
  })
})
