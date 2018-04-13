import * as sinon from 'sinon'
import nullary from './nullary'

describe('[ nullary ]', function () {
  it('should work', function () {
    const spy = sinon.spy()
    const un = nullary(spy)
    un('a', 'b', 'c')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy)
  })
})
