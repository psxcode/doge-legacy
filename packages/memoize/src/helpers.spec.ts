/* tslint:disable no-unused-expression no-empty */
import { expect } from 'chai'
import { makeMapCache, makeObjectCache } from './helpers'

[makeObjectCache, makeMapCache].forEach((makeCache, i, arr) => {
  describe(`[ ${arr[i].name} ]`, function () {
    describe('[ get ]', function () {
      it('should return undefined', function () {
        const cache = makeCache()
        expect(cache.get('key')).undefined
      })

      it('should return proper value', function () {
        const cache = makeCache()
        cache.set('key', 'value')
        expect(cache.get('key')).eq('value')
      })
    })

    describe('[ has ]', function () {
      it('should return false', function () {
        const cache = makeCache()
        expect(cache.has('key')).eq(false)
      })

      it('should return true', function () {
        const cache = makeCache()
        cache.set('key', 'value')
        expect(cache.has('key')).eq(true)
      })
    })

    describe('[ set ]', function () {
      it('should work', function () {
        const cache = makeCache()
        cache.set('key', 'value')
        expect(cache.get('key')).eq('value')
      })

      it('should replace', function () {
        const cache = makeCache()
        cache.set('key', 'value')
        cache.set('key', 'other value')
        expect(cache.get('key')).eq('other value')
      })
    })
  })
})
