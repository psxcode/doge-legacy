import * as sinon from 'sinon'
import positional from './positional'

describe('[ positional ]', function () {
  it('should work', function () {
    const spy = sinon.spy()
    const f = positional()(spy)
    f({ a: 1, b: 2, c: 3 })
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 1, 2, 3)
  })
  it('should work', function () {
    const spy = sinon.spy()
    const f = positional(() => ['b', 'a'])(spy)
    f({ a: 1, b: 2, c: 3 })
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 2, 1)
  })
})
