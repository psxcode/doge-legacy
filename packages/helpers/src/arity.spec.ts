/* tslint:disable no-empty */
import * as sinon from 'sinon'
import { binary, nullary, ternary, unary } from './arity'

const makeSpy = () => sinon.spy()

describe('[ arity / nullary ]', function () {
  it('should work', function () {
    const spy = makeSpy()
    const un = nullary(spy)
    un('a', 'b', 'c')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy)
  })
})

describe('[ arity / unary ]', function () {
  it('should work', function () {
    const spy = makeSpy()
    const un = unary(spy)
    un('a', 'b', 'c')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 'a')
  })
})

describe('[ arity / binary ]', function () {
  it('should work', function () {
    const spy = makeSpy()
    const un = binary(spy)
    un('a', 'b', 'c')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 'a', 'b')
  })
})

describe('[ arity / ternary ]', function () {
  it('should work', function () {
    const spy = makeSpy()
    const un = ternary(spy)
    un('a', 'b', 'c', 'd')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 'a', 'b', 'c')
  })
})
