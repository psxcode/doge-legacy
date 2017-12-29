import { expect } from 'chai'
import { base64ascii } from './helpers'

describe('[ challenge-cookie / helpers ]', function () {
  describe('[ base64ascii ]', function () {
    it('should decode base64 string', function () {
      expect(base64ascii('dGVzdCB0ZXh0')).eq('test text')
    })
  })
})
