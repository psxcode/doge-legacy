import * as sinon from 'sinon'
import tuple from './tuple'
import positional from './positional'



describe('[ positional ]', () => {
  it('should work', () => {
    const spy = (a: number) => 42
    const keys = { c: 1 }
    const f = positional(spy, ['c'])
    f({ c: 3, a: 1 })
  })
  it('should work', () => {
    const spy = sinon.spy()
    const f = positional(() => ['b', 'a'])(spy)
    f({ a: 1, b: 2, c: 3 })
  })
})
