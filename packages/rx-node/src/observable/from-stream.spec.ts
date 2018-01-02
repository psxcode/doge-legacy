import { expect } from 'chai'
import * as sinon from 'sinon'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import { fromStream } from './from-stream'
import { Readable, ReadableOptions } from 'stream'

const makeReadable = (data: string[], opts: ReadableOptions = {}) => {
  let i = 0
  return new Readable({
    encoding: 'utf8',
    read () {
      this.push(i >= data.length ? null : data[i++])
    }
  })
}
const makeErrorReadable = (opts: ReadableOptions = {}) => {
  return new Readable({
    encoding: 'utf8',
    read () {
      this.emit('error')
    }
  })
}
const makeDataSpy = <T> (data: T[]) => {
  let i = 0
  return sinon.spy((chunk: T) => {
    if (i >= data.length) {
      throw new Error(`Num calls limit reached\ndata.length = ${data.length}`)
    }
    expect(chunk).eq(data[i])
    ++i
  })
}
const delayPromise = (delay: number) =>
  new Promise(resolve => setTimeout(resolve, delay))

describe('[ rx-node / from-stream ]', function () {
  it('should work with simple readable', async function () {
    const data = 'this is test'.split(' ')
    const source = makeReadable(data)
    const dataSpy = makeDataSpy(data)
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    fromStream(source).subscribe(dataSpy, errSpy, endSpy)

    await delayPromise(20)
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

    await delayPromise(20)
    sinon.assert.notCalled(dataSpy)
    sinon.assert.notCalled(endSpy)
    sinon.assert.calledOnce(errSpy)
  })
})
