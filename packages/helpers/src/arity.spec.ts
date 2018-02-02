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
  voidify
} from './arity'
import { identity } from './identity'

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
      const f = named('a', 'b', 'c')(spy)
      f(1, 2, 3)
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy, { a: 1, b: 2, c: 3 })
    })
  })

  describe('[ positional ]', function () {
    it('should work', function () {
      const spy = makeSpy()
      const f = positional('a', 'b', 'c')(spy)
      f({ a: 1, b: 2, c: 3 })
      sinon.assert.calledOnce(spy)
      sinon.assert.calledWithExactly(spy, 1, 2, 3)
    })
  })
})
