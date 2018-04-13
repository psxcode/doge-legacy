import { expect } from 'chai'
import { pipe } from '@doge/compose'
import bind from './bind'

const id = (value: any) => value
const add = (a: number, b: number) => a + b
const addNamed = (a: string, b: string) => (p: {[k: string]: any}) => p[a] + p[b]
const sum = (...args: number[]) => args.reduce(add)
const getCtx = function () {
  return this
}

describe('[ bind ]', function () {
  it('should work as a constant', function () {
    const binded = bind(10)(id)
    expect(binded()).eq(10)
  })

  it('should work', function () {
    const binded = bind(10)(add)
    expect(binded(10)).eq(20)
  })

  it('should work with pipe', function () {
    const binded = pipe(bind(10, 20), bind(10), bind(2))(sum)
    expect(binded()).eq(42)
  })
})
