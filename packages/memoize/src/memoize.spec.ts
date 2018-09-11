import { expect } from 'chai'
import * as sinon from 'sinon'
import memoize from './memoize'
import { IMemoizeCache } from './types'

const makeSpyCache = (cache: { [k: string]: any } = Object.create(null)) => {
  const c: IMemoizeCache<any, any> = {
    get (key: any) {
      return cache[key]
    },
    set (key: any, value: any) {
      cache[key] = value
      return this
    },
    has (key: any) {
      return Reflect.has(cache, key)
    }
  }
  sinon.stub(c, 'get').callThrough()
  sinon.stub(c, 'set').callThrough()
  sinon.stub(c, 'has').callThrough()
  return c
}

describe('[ memoize ]', () => {
  it('should set value to cache', () => {
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

  it('should get value from cache', () => {
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
