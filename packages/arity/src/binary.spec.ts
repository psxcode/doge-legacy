import * as sinon from 'sinon'
import binary from './binary'

describe('[ binary ]', function () {
  it('should work', function () {
    const spy = sinon.spy()
    const un = binary(spy)
    un('a', 'b', 'c')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 'a', 'b')
  })
})
