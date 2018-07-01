import { expect } from 'chai'
import nullary from './nullary'

describe('[ nullary ]', () => {
  it('should work', () => {
    const spy = (a: number) => 42
    const un = nullary(spy)
    un('a', 'b', 'c')
  })
})
