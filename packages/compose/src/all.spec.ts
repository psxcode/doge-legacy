import { expect } from 'chai'
import all from './all'
import pipe from './pipe'

const add = (arg0: number) => (arg1: number): number => arg0 + arg1
const mult = (arg0: number) => (arg1: number): number => arg0 * arg1
const constant = <T> (arg: T) => () => arg
const toString = (arg: any): string => `${arg}`
const toNumber = (arg: string): number => Number(arg)

describe('[ all ]', function () {
  it('should return the identity function', function () {
    const piped = all()
    expect(piped(1)).deep.eq([1])
  })

  it('should work with a constant function', function () {
    const piped = all(constant(10))
    expect(piped(4)).deep.eq([10])
  })

  it('should work with one function', function () {
    const piped = all(add(2))
    expect(piped(2)).deep.eq([4])
  })

  it('should work with multiple functions', function () {
    const piped = all(constant(10), add(2), toString)
    expect(piped(4)).deep.eq([10, 6, '4'])
  })

  it('should work with functions returning different type', function () {
    const piped = all(toNumber, pipe(toNumber, mult(10)))
    expect(piped('10')).deep.eq([10, 100])
  })
})
