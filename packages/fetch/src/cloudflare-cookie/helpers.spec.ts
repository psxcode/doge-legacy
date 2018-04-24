import { expect } from 'chai'
import { base64ascii } from './helpers'

describe('[ challenge-cookie / helpers ]', () => {
  describe('[ base64ascii ]', () => {
    it('should decode base64 string', () => {
      expect(base64ascii('dGVzdCB0ZXh0')).eq('test text')
    })
  })
})
