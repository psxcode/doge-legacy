import { expect } from 'chai'
import { setUriParams, updateQueryStringParameter } from './index'

describe('[ helpers / updateQueryStringParameter ]', function () {

  it('should update current param', function () {
    const uri = 'doge.org?phrase=wow'
    const result = updateQueryStringParameter(uri, ['phrase', 'suchadog'])

    expect(result).eq('doge.org?phrase=suchadog')
  })

  it('should update current param', function () {
    const uri = 'doge.org?phrase=wow&type=shiba'
    const result = updateQueryStringParameter(uri, ['phrase', 'suchadog'])

    expect(result).eq('doge.org?phrase=suchadog&type=shiba')
  })

  it('should update current param', function () {
    const uri = 'doge.org?phrase=wow&type=shiba'
    const result = updateQueryStringParameter(uri, ['type', 'generic'])

    expect(result).eq('doge.org?phrase=wow&type=generic')
  })

  it('should add param if param is missing in list', function () {
    const uri = 'doge.org?phrase=wow'
    const result = updateQueryStringParameter(uri, ['type', 'shiba'])

    expect(result).eq('doge.org?phrase=wow&type=shiba')
  })

  it('should add param if params list is empty', function () {
    const uri = 'doge.org'
    const result = updateQueryStringParameter(uri, ['type', 'generic'])

    expect(result).eq('doge.org?type=generic')
  })

  it('should add param if uri is empty', function () {
    const uri = ''
    const result = updateQueryStringParameter(uri, ['type', 'generic'])

    expect(result).eq('?type=generic')
  })

  it('should add param if uri is empty', function () {
    const uri = '?type=shiba'
    const result = updateQueryStringParameter(uri, ['type', 'generic'])

    expect(result).eq('?type=generic')
  })
})

describe('[ helpers / setUriParams ]', function () {

  it('should return same Uri if params are empty', function () {
    const uri = 'http://doge.org'
    const params = {}
    const uriWithParams = setUriParams(params, uri)

    expect(uriWithParams).eq(uri)
  })

  it('should return same Uri if params are invalid', function () {
    const uri = 'http://doge.org'
    const params = void 0
    const uriWithParams = setUriParams(params, uri)

    expect(uriWithParams).eq(uri)
  })

  it('should return same Uri if params are invalid type', function () {
    const uri = 'http://doge.org'
    const params = true
    const uriWithParams = setUriParams(params, uri)

    expect(uriWithParams).eq(uri)
  })

  it('should return Uri with 1 param', function () {
    const uri = 'http://doge.org'
    const params = {
      type: 'shiba'
    }
    const uriWithParams = setUriParams(params, uri)

    expect(uriWithParams).eq('http://doge.org?type=shiba')
  })

  it('should return Uri with 2 params', function () {
    const uri = 'http://doge.org'
    const params = {
      type: 'shiba',
      phrase: 'wow'
    }
    const uriWithParams = setUriParams(params, uri)

    expect(uriWithParams).eq('http://doge.org?type=shiba&phrase=wow')
  })

  it('should return Uri with multiple params', function () {
    const uri = 'doge.org'
    const params = {
      type: 'shiba',
      phrase: 'wow',
      color: 'yellow'
    }
    const uriWithParams = setUriParams(params, uri)

    expect(uriWithParams).eq('doge.org?type=shiba&phrase=wow&color=yellow')
  })

  it('should work if url is empty', function () {
    const uri = ''
    const params = {
      type: 'shiba',
      phrase: 'wow',
      color: 'yellow'
    }
    const uriWithParams = setUriParams(params, uri)

    expect(uriWithParams).eq('type=shiba&phrase=wow&color=yellow')
  })
})
