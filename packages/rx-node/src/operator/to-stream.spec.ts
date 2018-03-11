import { expect } from 'chai'
import * as sinon from 'sinon'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import { waitTimePromise as wait } from '@doge/helpers'
import { toStream } from './to-stream'

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

describe('[ rx-node / to-stream ]', function () {
  this.slow(200)

  it('should work with single string', async function () {
    const source$ = Observable.of('test')
    const stream = toStream.call(source$, { encoding: 'utf8' })
    const dataSpy = makeDataSpy(['test'])
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()

    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await wait(100)
    sinon.assert.callCount(dataSpy, 1)
    sinon.assert.calledOnce(endSpy)
    sinon.assert.notCalled(errSpy)
  })

  it('should work with multiple strings', async function () {
    const data = 'this is test'.split(' ')
    const source$ = Observable.from(data)
    const stream = toStream.call(source$, { encoding: 'utf8' })
    const dataSpy = makeDataSpy(data)
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()

    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await wait(100)
    sinon.assert.callCount(dataSpy, 3)
    sinon.assert.calledOnce(endSpy)
    sinon.assert.notCalled(errSpy)
  })

  it('should work with errors inside observable', async function () {
    const source$ = Observable.interval(10).map((v: number) => {
      if (v < 2) return `${v}`
      throw new Error('')
    })
    const stream = toStream.call(source$, { encoding: 'utf8' })
    const dataSpy = makeDataSpy(['0', '1', '2'])
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()

    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await wait(100)
    sinon.assert.callCount(dataSpy, 2)
    sinon.assert.calledOnce(endSpy)
    sinon.assert.calledOnce(errSpy)
  })

  it('should work with encoding', async function () {
    const source$ = Observable.of('this is test')
    const stream = toStream.call(source$, { encoding: 'base64' })
    const dataSpy = makeDataSpy(['dGhpcyBpcyB0ZXN0'])
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()

    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await wait(100)
    sinon.assert.callCount(dataSpy, 1)
    sinon.assert.calledOnce(endSpy)
    sinon.assert.notCalled(errSpy)
  })

  it('should work with encoding', async function () {
    const source$ = Observable.of(new Buffer('dGhpcyBpcyB0ZXN0', 'base64'))
    const stream = toStream.call(source$, { encoding: 'utf8' })
    const dataSpy = makeDataSpy(['this is test'])
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()

    stream.on('data', dataSpy)
    stream.on('error', errSpy)
    stream.on('end', endSpy)

    await wait(100)
    sinon.assert.callCount(dataSpy, 1)
    sinon.assert.calledOnce(endSpy)
    sinon.assert.notCalled(errSpy)
  })
})
