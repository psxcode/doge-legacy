import { expect } from 'chai'
import * as sinon from 'sinon'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import { waitTimePromise as wait } from '@doge/helpers'
import { toEventEmitter } from './to-event-emitter'

const makeDataSpy = <T> (expectedData: T[]) => {
  let i = 0
  return sinon.spy((chunk: T) => {
    if (i >= expectedData.length) {
      throw new Error(`Num calls limit reached, expectedData.length = ${expectedData.length}`)
    }
    expect(chunk).eq(expectedData[i++])
  })
}

describe('[ rx-node / to-event-emitter ]', function () {
  this.slow(200)

  it('should work with single chunk', async function () {
    const source$ = Observable.of('test')
    const dataSpy = makeDataSpy(['test'])
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    const ee = toEventEmitter.call(source$)
    ee.on('data', dataSpy)
    ee.on('end', endSpy)
    ee.on('error', errSpy)
    ee.publish()

    await wait(100)
    sinon.assert.calledOnce(dataSpy)
    sinon.assert.calledOnce(endSpy)
    sinon.assert.notCalled(errSpy)
  })

  it('should work with custom \'data\' event name', async function () {
    const source$ = Observable.of('test')
    const dataSpy = makeDataSpy(['test'])
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    const ee = toEventEmitter.call(source$, 'customData')
    ee.on('customData', dataSpy)
    ee.on('end', endSpy)
    ee.on('error', errSpy)
    ee.publish()

    await wait(100)
    sinon.assert.calledOnce(dataSpy)
    sinon.assert.calledOnce(endSpy)
    sinon.assert.notCalled(errSpy)
  })

  it('should work with multiple chunks', async function () {
    const data = 'this is test'.split(' ')
    const source$ = Observable.from(data)
    const dataSpy = makeDataSpy(data)
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    const ee = toEventEmitter.call(source$)
    ee.on('data', dataSpy)
    ee.on('end', endSpy)
    ee.on('error', errSpy)
    ee.publish()

    await wait(100)
    sinon.assert.callCount(dataSpy, data.length)
    sinon.assert.calledOnce(endSpy)
    sinon.assert.notCalled(errSpy)
  })

  it('should work with errors', async function () {
    const source$ = Observable.throw('Error')
    const dataSpy = sinon.spy()
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    const ee = toEventEmitter.call(source$)
    ee.on('data', dataSpy)
    ee.on('end', endSpy)
    ee.on('error', errSpy)
    ee.publish()

    await wait(100)
    sinon.assert.notCalled(dataSpy)
    sinon.assert.notCalled(endSpy)
    sinon.assert.calledOnce(errSpy)
  })

  it('should return subscription', async function () {
    const source$ = Observable.interval(20)
    const dataSpy = sinon.spy()
    const errSpy = sinon.spy()
    const endSpy = sinon.spy()
    const ee = toEventEmitter.call(source$)
    ee.on('data', dataSpy)
    ee.on('end', endSpy)
    ee.on('error', errSpy)
    const sub = ee.publish()

    await wait(100)
    sub.unsubscribe()
    sinon.assert.callCount(dataSpy, 4)
    sinon.assert.notCalled(endSpy)
    sinon.assert.notCalled(errSpy)
  })
})
