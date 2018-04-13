import { expect } from 'chai'
import voidify from './voidify'
import identity from './identity'

describe('[ voidify ]', function () {
  it('should work', function () {
    const result = voidify(identity)('value')
    expect(result).eq(undefined)
  })
})
