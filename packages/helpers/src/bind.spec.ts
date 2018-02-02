import { expect } from 'chai'
import { bind, bindCtx } from './bind'
import { pipe } from './pipe'

const id = (value: any) => value
const add = (a: number, b: number) => a + b
const sum = (...args: number[]) => args.reduce(add)
const getCtx = function () { return this }

describe('[ bind ]', function () {
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

  describe('[ bindCtx ]', function () {
    it('should work as a constant', function () {
      const ctx = {
        value: 10
      }
      const binded = bindCtx(ctx)(getCtx)
      expect(binded()).deep.eq(ctx)
    })

    it('should work with pipe', function () {
      const ctx = {
        value: 10
      }
      const ctx2 = {
        value: 20
      }
      const binded = pipe(bindCtx(ctx), bindCtx(ctx2))(getCtx)
      expect(binded()).deep.eq(ctx)
    })
  })
})
