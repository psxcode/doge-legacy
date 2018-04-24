import * as sinon from 'sinon'
import nullary from './nullary'

describe('[ nullary ]', () => {
  it('should work', () => {
    const spy = sinon.spy()
    const un = nullary(spy)
    un('a', 'b', 'c')
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy)
  })
})
