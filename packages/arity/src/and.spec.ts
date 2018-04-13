import { expect } from 'chai'
import and from './and'

describe('[ and ]', function () {
  it('should work', async function () {
    const pred = and(x => x === 1, x => x !== 1)
    expect(pred(1)).eq(false)
  })

  it('should work', async function () {
    const pred = and(x => x === 1, () => true)
    expect(pred(1)).eq(true)
  })

  it('should work', async function () {
    const pred = and(x => x === 1, x => !!x && x > 0)
    expect(pred(1)).eq(true)
  })
})
