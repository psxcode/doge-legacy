import { expect } from 'chai'
import or from './or'

describe('[ or ]', () => {
  it('should work', async () => {
    const pred = or((x: number) => x === 1, x => x !== 1)
    expect(pred(1)).eq(true)
  })

  it('should work', async () => {
    const pred = or((x: number) => x === 1, () => false)
    expect(pred(0)).eq(false)
  })

  it('should work', async () => {
    const pred = or((x: number) => x === 1, x => !!x && x > 0)
    expect(pred(5)).eq(true)
  })
})
