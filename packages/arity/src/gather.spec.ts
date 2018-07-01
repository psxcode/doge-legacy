import { expect } from 'chai'
import gather from './gather'

describe('[ gather ]', () => {
  it('should work', () => {
    let data
    const spy = (args: number[]) => {
      data = args
    }
    const f = gather(spy)
    f(1, 2, 3)
    expect(data).deep.eq([1, 2, 3])
  })

  it('should work', () => {
    let data
    const spy = (args: [number, boolean, string]) => {
      data = args
    }
    const f = gather(spy)
    f(1, true, '3')
    expect(data).deep.eq([1, true, '3'])
  })
})
