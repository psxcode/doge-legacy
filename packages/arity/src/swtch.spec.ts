import { expect } from 'chai'
import swtch from './swtch'

describe('[ swtch ]', function () {
  it('should work', function () {
    const br = swtch(x => x === 1, x => x, x => x * 2)
    expect(br(1)).eq(1)
    expect(br(2)).eq(4)
  })

  it('should work', function () {
    const br = swtch(x => x === 1, x => x)
    expect(br(1)).eq(1)
    expect(br(2)).eq(undefined)
  })

  it('should work', function () {
    const br = swtch()
    expect(br(1)).eq(undefined)
  })

  it('should work', function () {
    const br = swtch(x => x === 1)
    expect(br(2)).eq(undefined)
  })

  it('should work', function () {
    const br = swtch(x => x === 1, x => x, x => x === 2, x => x * 2, () => 5)
    expect(br(1)).eq(1)
    expect(br(2)).eq(4)
    expect(br()).eq(5)
  })
})
