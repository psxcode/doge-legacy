/* tslint:disable no-empty */
import { expect } from 'chai'
import * as sinon from 'sinon'
import {
  binary,
  gather,
  named,
  nullary,
  positional,
  spread,
  ternary,
  unary,
  voidify,
  bind,
  bindCtx,
  bindProps,
  identity,
  identityAsync,
  constant,
  constantAsync, curry, branch
} from './arity'
import { pipe } from './pipe'

const makeSpy = () => sinon.spy()

describe('[ arity ]', function () {
  describe('[ nullary ]', function () {
    it('should work', function () {
      const spy = makeSpy()
      const un = nullary(spy)
      un('a', 'b', 'c')
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy)
    })
  })

  describe('[ unary ]', function () {
    it('should work', function () {
      const spy = makeSpy()
      const un = unary(spy)
      un('a', 'b', 'c')
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy, 'a')
    })
  })

  describe('[ binary ]', function () {
    it('should work', function () {
      const spy = makeSpy()
      const un = binary(spy)
      un('a', 'b', 'c')
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy, 'a', 'b')
    })
  })

  describe('[ ternary ]', function () {
    it('should work', function () {
      const spy = makeSpy()
      const un = ternary(spy)
      un('a', 'b', 'c', 'd')
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy, 'a', 'b', 'c')
    })
  })

  describe('[ voidify ]', function () {
    it('should work', function () {
      const result = voidify(identity)('value')
      expect(result).eq(undefined)
    })
  })

  describe('[ spread ]', function () {
    it('should work', function () {
      const spy = makeSpy()
      const f = spread(spy)
      f(['a', 'b', 'c'])
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy, 'a', 'b', 'c')
    })
  })

  describe('[ gather ]', function () {
    it('should work', function () {
      const spy = makeSpy()
      const f = gather(spy)
      f('a', 'b', 'c')
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy, ['a', 'b', 'c'])
    })
  })

  describe('[ named ]', function () {
    it('should work', function () {
      const spy = makeSpy()
      const f = named(() => ['a', 'b', 'c'])(spy)
      f(1, 2, 3)
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy, { a: 1, b: 2, c: 3 })
    })
  })

  describe('[ positional ]', function () {
    it('should work', function () {
      const spy = makeSpy()
      const f = positional()(spy)
      f({ a: 1, b: 2, c: 3 })
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy, 1, 2, 3)
    })
    it('should work', function () {
      const spy = makeSpy()
      const f = positional(() => ['b', 'a'])(spy)
      f({ a: 1, b: 2, c: 3 })
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy, 2, 1)
    })
  })

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

  describe('[ bindProps ]', function () {
    it('should work as a constant', function () {
      const binded = bindProps({ value0: 0 })(id)
      expect(binded()).deep.eq({ value0: 0 })
    })

    it('should work', function () {
      const binded = bindProps({ val0: 5 })(addNamed('val0', 'val1'))
      expect(binded({ val1: 10 })).eq(15)
    })
  })

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

  describe('[ identity ]', function () {
    it('should return same value', function () {
      expect(identity(42)).eq(42)
    })
  })

  describe('[ identityAsync ]', function () {
    it('should return same value', async function () {
      expect(await identityAsync(42)).eq(42)
    })
  })

  describe('[ constant ]', function () {
    it('should return same value', function () {
      expect(constant(42)()).eq(42)
    })
  })

  describe('[ constantAsync ]', function () {
    it('should return same value', async function () {
      expect(await constantAsync(42)()).eq(42)
    })
  })

  describe('[ branch ]', function () {
    it('should work', async function () {
      const br = branch(x => x === 1, (x) => x, (x) => x * 2)
      expect(br(1)).eq(1)
      expect(br(2)).eq(4)
    })
  })
})
