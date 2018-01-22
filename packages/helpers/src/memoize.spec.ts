/* tslint:disable no-unused-expression no-empty */
import { expect } from 'chai'
import * as sinon from 'sinon'
import { ICache, makeObjectCache, memoize } from './memoize'

const jsonSerializer = (value: any) => JSON.stringify(value)
const identitySerializer = (value: any) => value
const makeMapCache = (): ICache<any, any> => new Map()
const cacheFactories = [makeObjectCache, makeMapCache]

const makeSpyCache = (cache: {[k: string]: any} = {}): ICache<any, any> => {
  const c = {
    get (key: any) { return cache[key] },
    set (key: any, value: any) { cache[key] = value },
    has (key: any) { return Object.prototype.hasOwnProperty.call(cache, key) }
  }
  sinon.stub(c, 'get').callThrough()
  sinon.stub(c, 'set').callThrough()
  sinon.stub(c, 'has').callThrough()
  return c
}

cacheFactories.forEach((makeCache: () => ICache<any, any>) => {
  describe(`[ memoize / Cache ]`, function () {
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
