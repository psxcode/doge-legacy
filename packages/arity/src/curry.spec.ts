import { expect } from 'chai'
import curry from './curry'

const add = (a: number, b: number) => a + b

describe('[ curry ]', () => {
  it('should work', () => {
    const binded0 = curry(add)
    expect(typeof binded0).eq('function')
    const binded1 = binded0(2)
    expect(typeof binded1).eq('function')
    const binded2 = binded1(3)
    expect(typeof binded2).eq('number')
  })
})
