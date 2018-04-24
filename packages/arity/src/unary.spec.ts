import * as sinon from 'sinon'
import unary from './unary'

describe('[ unary ]', () => {
  it('should work', () => {
    const spy = sinon.spy()
    const un = unary(spy)
    un('a', 'b', 'c')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 'a')
  })
})
