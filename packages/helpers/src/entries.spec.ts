import { expect } from 'chai'
import { entries } from './entries'

describe('[ entries ]', function () {
  it('should return entries of object', function () {
    const given = {
      foo: 'foo',
      bar: 4,
      baz: true
    }
    const expected = [
      ['foo', 'foo'],
      ['bar', 4],
      ['baz', true]
    ]

    expect(entries(given)).deep.eq(expected)
  })
})
