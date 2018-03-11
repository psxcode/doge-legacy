import { expect } from 'chai'
import * as sinon from 'sinon'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import { waitTimePromise as wait } from '@doge/helpers'
import { fromStream } from './from-stream'
import { Readable, ReadableOptions } from 'stream'

const makeReadable = (data: string[], opts: ReadableOptions = {}) => {
  let i = 0
  return new Readable({
    ...opts,
    read () {
      this.push(i >= data.length ? null : data[i++])
    }
  })
}
const makeErrorReadable = (opts: ReadableOptions = {}) => {
  return new Readable({
    ...opts,
    read () {
      this.emit('error')
    }
  })
}
const makeDataSpy = <T> (expectedData: T[]) => {
  let i = 0
  return sinon.spy((chunk: T) => {
    if (i >= expectedData.length) {
      throw new Error(`Num calls limit reached, expectedData.length = ${expectedData.length}`)
    }
    expect(chunk).eq(expectedData[i])
    ++i
  })
}

describe('[ rx-node / from-stream ]', function () {
  this.slow(200)

  it('should work with simple readable', async function () {
    const data = 'this is test'.split(' ')
    const source = makeReadable(data, { encoding: 'utf8' })
    const dataSpy = makeDataSpy(data)
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    fromStream(source).subscribe(dataSpy, errSpy, endSpy)

    await wait(100)
    sinon.assert.callCount(dataSpy, data.length)
    sinon.assert.calledOnce(endSpy)
    sinon.assert.notCalled(errSpy)
  })

  it('should work with error', async function () {
    const source = makeErrorReadable()
    const dataSpy = makeDataSpy([])
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    fromStream(source).subscribe(dataSpy, errSpy, endSpy)

    await wait(100)
    sinon.assert.notCalled(dataSpy)
    sinon.assert.notCalled(endSpy)
    sinon.assert.calledOnce(errSpy)
  })
})
