import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import bind from './bind'

const id = (value: any) => value
const add = (a: number, b: number) => a + b
const addNamed = (a: string, b: string) => (p: {[k: string]: any}) => p[a] + p[b]
const sum = (...args: number[]) => args.reduce(add)
const getCtx = () => {
  return this
}

describe('[ bind ]', () => {
  it('should work as a constant', () => {
    const binded = bind(10)(id)
    expect(binded()).eq(10)
  })

  it('should work', () => {
    const binded = bind(10)(add)
    expect(binded(10)).eq(20)
  })

  it('should work with pipe', () => {
    const binded = pipe(bind(10, 20), bind(10), bind(2))(sum)
    expect(binded()).eq(42)
  })
})
