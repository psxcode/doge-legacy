/* tslint:disable no-empty */
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as debug from 'debug'
import {
  readableFromStringsAsync, readableFromStringsOnePushAsync, readableFromStringsOnePushSync,
  readableFromStringsSync
} from './readable'
import { EventEmitter } from 'events'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const waitForEnd = (ee: EventEmitter, ms = 10) => new Promise((resolve, reject) => {
  const startedAt = Date.now()
  ee.on('end', () => {
    debug('stream-test:wait-for-end')('ended within %dms', Date.now() - startedAt)
    wait(ms).then(resolve)
  })
  ee.on('error', () => {
    debug('stream-test:wait-for-end')('error within %dms', Date.now() - startedAt)
    wait(ms).then(reject)
  })
})

interface TestFn {
  (str: string): void
  callCount (): number
  data (): string[]
}

const makeSpy = (): TestFn => {
  let callCount = 0
  let data: string[] = []
  const dbg = debug('stream-test:data-spy')
  const spy = (str: string) => {
    dbg('consume \'%s\' at %d', str, callCount)
    data.push(str)
    ++callCount
  }
  (spy as TestFn).callCount = () => callCount;
  (spy as TestFn).data = () => data
  return (spy as TestFn)
}

const makeSingleString = () => ['test']
const makeSmallStrings = (repeat = 1) =>
  `my simple small test`
    .repeat(repeat).split(' ')
const makeMediumStrings = (repeat = 1) =>
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
    .repeat(5)
    .repeat(repeat).split(' ')
const makeLargeStrings = (repeat = 1) =>
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
    .repeat(40)
    .repeat(repeat).split(' ')

describe('[ stream-test / readable ]', function () {
  it('should', async function () {
    const data = makeLargeStrings()
    const stream = readableFromStringsSync()(data)
    const dataSpy = sinon.spy()
    stream.on('data', dataSpy)

    await waitForEnd(stream)
    sinon.assert.callCount(dataSpy, data.length)
  })

  it('should', async function () {
    const data = makeSmallStrings(3)
    const stream = readableFromStringsOnePushSync()(data, { highWaterMark: 30 })
    const dataSpy = makeSpy()
    stream.on('data', dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
    // sinon.assert.callCount(dataSpy, data.length)
  })

  it.only('should', async function () {
    const data = makeSmallStrings(3)
    const stream = readableFromStringsOnePushAsync(100)(data, { highWaterMark: 1 })
    const dataSpy = makeSpy()
    stream.on('data', dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
    debug('stream-test:from-strings-one-push-async:test')('call count %d', dataSpy.callCount())
  })
})
