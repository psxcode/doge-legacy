import { expect } from 'chai'
import curry from './curry'

const add = (a: number, b: number) => a + b
const sum = (...args: number[]) => args.reduce(add)

describe('[ curry ]', function () {
  it('should work', function () {
    let binded = curry(sum, 2)
    expect(typeof binded).eq('function')
    binded = binded(2)
    expect(typeof binded).eq('function')
    binded = binded(3)
    expect(typeof binded).eq('number')
  })
})
