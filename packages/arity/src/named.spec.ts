import * as sinon from 'sinon'
import named from './named'

describe('[ named ]', () => {
  it('should work', () => {
    const spy = sinon.spy()
    const f = named(() => ['a', 'b', 'c'])(spy)
    f(1, 2, 3)
    sinon.assert.calledOnce(spy)
    sinon.assert.calledWithExactly(spy, { a: 1, b: 2, c: 3 })
  })
})
