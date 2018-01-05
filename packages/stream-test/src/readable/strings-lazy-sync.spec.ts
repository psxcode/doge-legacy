/* tslint:disable no-conditional-assignment */
import { expect } from 'chai'
import {
  makeMediumStrings,
  makeSmallStrings,
  makeDataSpy,
  wait,
  waitForEnd,
  waitForEndOrError,
  makeOnDataConsumer,
  makeOnReadableConsumer
} from './test-helpers'
import { readableStringsLazySync } from './strings-lazy-sync'

describe('[ stream-test / readable / from-strings-sync ]', function () {
  this.slow(1000)

  /**
   * Consuming lazy-sync-stream, using sync-data consumer
   * every 'this.push' inside readable, results in 'data' event,
   * so data arrives in same order and chunks
   */
  it.only('consuming string stream, using \'data\'', async function () {
    const data = makeMediumStrings()
    const stream = readableStringsLazySync()(data)
    const dataSpy = makeDataSpy()
    makeOnDataConsumer(stream, dataSpy)

    await waitForEndOrError(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
  })

  /**
   * Consuming stream, using sync-data consumer
   * every 'this.push' inside readable, results in 'data' event,
   * so data arrives in same order and chunks
   */
  it.only('consuming string stream, using \'data\'', async function () {
    const data = makeMediumStrings()
    const stream = readableStringsLazySync()(data, { objectMode: true })
    const dataSpy = makeDataSpy()
    makeOnDataConsumer(stream, dataSpy)

    await waitForEndOrError(stream)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
  })

  /**
   * Consuming stream in 'object-mode', using eager sync 'readable' consumer
   * every 'stream.read()' returns one object
   * you must use eager 'readable' consumer, or stream hangs
   * worst case, better use 'data' consumer
   */
  it('consuming object stream, using \'readable\'', async function () {
    const data = makeMediumStrings()
    const stream = readableStringsLazySync()(data, { objectMode: true })
    const dataSpy = makeDataSpy()
    wait(100)
    makeOnReadableConsumer(stream, dataSpy, { eager: true })

    await waitForEndOrError(stream, 100)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
  })

  /**
   * Consuming stream in 'object-mode', using eager async 'readable' consumer
   * you must use eager 'readable' consumer, or stream hangs
   * worst case, better use 'data' consumer
   */
  it('consuming object stream, using \'readable\'', async function () {
    const data = makeMediumStrings()
    const stream = readableStringsLazySync()(data, { objectMode: true })
    const dataSpy = makeDataSpy()
    wait(100)
    makeOnReadableConsumer(stream, dataSpy, { readDelayMs: 50, eager: true })

    await waitForEndOrError(stream, 100)
    expect(dataSpy.data()).deep.eq(data)
    expect(dataSpy.callCount()).eq(data.length)
  })

  /**
   * Consuming stream, using eager sync 'readable' consumer
   * bad case, use 'lazy-readable' or 'data' consumer
   */
  it('consuming string stream, using \'readable\'', async function () {
    const data = makeMediumStrings()
    const stream = readableStringsLazySync()(data)
    const dataSpy = makeDataSpy()
    wait(100)
    makeOnReadableConsumer(stream, dataSpy, { eager: true })

    await waitForEnd(stream)
    expect(dataSpy.data().join('')).deep.eq(data.join(''))
  })

  /**
   * Consuming stream, using lazy sync 'readable' consumer
   * 'string' data arrives concatenated up to 'highWaterMark',
   * resulting in small amount of 'readable' events
   */
  it('consuming string stream, using \'readable\'', async function () {
    const data = makeMediumStrings()
    const stream = readableStringsLazySync()(data)
    const dataSpy = makeDataSpy()
    wait(100)
    makeOnReadableConsumer(stream, dataSpy)

    await waitForEnd(stream)
    expect(dataSpy.data().join('')).deep.eq(data.join(''))
  })

  /**
   * Consuming stream, using lazy async 'readable' consumer
   * 'string' data arrives concatenated up to 'highWaterMark',
   * resulting in small amount of 'readable' events
   * best usage for concatable data
   */
  it('should', async function () {
    const data = makeMediumStrings()
    const stream = readableStringsLazySync()(data)
    const dataSpy = makeDataSpy()
    makeOnReadableConsumer(stream, dataSpy, { readDelayMs: 100 })

    await waitForEnd(stream)
    expect(dataSpy.data().join('')).deep.eq(data.join(''))
  })
})
