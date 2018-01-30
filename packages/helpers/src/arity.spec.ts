/* tslint:disable no-empty */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { binary, nullary, ternary, unary, voidify } from './arity'
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
})
