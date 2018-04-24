/* tslint:disable no-unused-expression no-empty */
import { expect } from 'chai'
import { makeMapCache, makeObjectCache } from './helpers'

[makeObjectCache, makeMapCache].forEach((makeCache, i, arr) => {
  describe(`[ ${arr[i].name} ]`, () => {
    describe('[ get ]', () => {
      it('should return undefined', () => {
        const cache = makeCache()
        expect(cache.get('key')).undefined
      })

      it('should return proper value', () => {
        const cache = makeCache()
        cache.set('key', 'value')
        expect(cache.get('key')).eq('value')
      })
    })

    describe('[ has ]', () => {
      it('should return false', () => {
        const cache = makeCache()
        expect(cache.has('key')).eq(false)
      })

      it('should return true', () => {
        const cache = makeCache()
        cache.set('key', 'value')
        expect(cache.has('key')).eq(true)
      })
    })

    describe('[ set ]', () => {
      it('should work', () => {
        const cache = makeCache()
        cache.set('key', 'value')
        expect(cache.get('key')).eq('value')
      })

      it('should replace', () => {
        const cache = makeCache()
        cache.set('key', 'value')
        cache.set('key', 'other value')
        expect(cache.get('key')).eq('other value')
      })
    })
  })
})
