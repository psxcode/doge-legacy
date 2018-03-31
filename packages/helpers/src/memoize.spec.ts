/* tslint:disable no-unused-expression no-empty */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { ICache, makeMapCache, makeObjectCache, memoize } from './memoize'
import { IHash } from './types'

const makeSpyCache = (cache: IHash<any> = {}) => {
  const c: ICache<any, any> = {
    get (key: any) {
      return cache[key]
    },
    set (key: any, value: any) {
      cache[key] = value
      return this
    },
    has (key: any) {
      return Object.prototype.hasOwnProperty.call(cache, key)
    }
  }
  sinon.stub(c, 'get').callThrough()
  sinon.stub(c, 'set').callThrough()
  sinon.stub(c, 'has').callThrough()
  return c
}

describe('[ memoize ]', function () {

  [makeObjectCache, makeMapCache].forEach((makeCache: () => ICache<any, any>) => {
    describe(`[ cache ]`, function () {
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

  describe('[ memoize ]', function () {
    it('should set value to cache', function () {
      const cache = makeSpyCache()
      const spy = sinon.mock().returns('value')
      const serializerSpy = sinon.mock().returns('key')
      const memo = memoize(cache, serializerSpy)(spy)

      const res = memo('arg')

      expect(res).eq('value')
      sinon.assert.calledOnce(serializerSpy)
      expect(serializerSpy.getCall(0).args).deep.eq(['arg'])
      sinon.assert.calledOnce(cache.has as sinon.SinonSpy)
      expect((cache.has as sinon.SinonSpy).getCall(0).args).deep.eq(['key'])
      sinon.assert.calledOnce(cache.set as sinon.SinonSpy)
      expect((cache.set as sinon.SinonSpy).getCall(0).args).deep.eq(['key', 'value'])
      sinon.assert.notCalled(cache.get as sinon.SinonSpy)
    })

    it('should get value from cache', function () {
      const cache = makeSpyCache({ 'key': 'value' })
      const spy = sinon.mock().returns('value')
      const serializerSpy = sinon.mock().returns('key')
      const memo = memoize(cache, serializerSpy)(spy)

      const res = memo('arg')

      expect(res).eq('value')
      sinon.assert.calledOnce(serializerSpy)
      expect(serializerSpy.getCall(0).args).deep.eq(['arg'])
      sinon.assert.calledOnce(cache.has as sinon.SinonSpy)
      expect((cache.has as sinon.SinonSpy).getCall(0).args).deep.eq(['key'])
      sinon.assert.notCalled(cache.set as sinon.SinonSpy)
      sinon.assert.calledOnce(cache.get as sinon.SinonSpy)
      expect((cache.get as sinon.SinonSpy).getCall(0).args).deep.eq(['key'])
    })
  })
})
