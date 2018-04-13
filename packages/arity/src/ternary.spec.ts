import * as sinon from 'sinon'
import ternary from './ternary'

describe('[ ternary ]', function () {
  it('should work', function () {
    const spy = sinon.spy()
    const un = ternary(spy)
    un('a', 'b', 'c', 'd')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 'a', 'b', 'c')
  })
})
