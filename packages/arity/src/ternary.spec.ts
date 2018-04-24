import * as sinon from 'sinon'
import ternary from './ternary'

describe('[ ternary ]', () => {
  it('should work', () => {
    const spy = sinon.spy()
    const un = ternary(spy)
    un('a', 'b', 'c', 'd')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, 'a', 'b', 'c')
  })
})
