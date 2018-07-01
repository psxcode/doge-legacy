import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import bindCtx from './bind-ctx'

function getCtx (): {} {
  return this
}

describe('[ bindCtx ]', () => {
  it('should work as a constant', () => {
    const ctx = {}
    const binded = bindCtx(getCtx, ctx)
    expect(binded() === ctx).eq(true)
  })

  // it('should work with pipe', () => {
  //   const ctx = {}
  //   const ctx2 = {}
  //   const binded = pipe(bindCtx(ctx), bindCtx(ctx2))(getCtx)
  //   expect(binded() === ctx).eq(true)
  // })
})
