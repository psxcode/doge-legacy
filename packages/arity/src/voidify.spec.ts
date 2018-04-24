import { expect } from 'chai'
import voidify from './voidify'
import identity from './identity'

describe('[ voidify ]', () => {
  it('should work', () => {
    const result = voidify(identity)('value')
    expect(result).eq(undefined)
  })
})
