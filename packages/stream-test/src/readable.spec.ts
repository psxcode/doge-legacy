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
import { makeReadable } from './readable'
import { Readable } from 'stream'

const makeTest = <T>(data: T[], stream: Readable, )

describe('[ stream-test / readable ]', function () {
  this.slow(1000)

  describe('[ lazy-sync-stream ]', function () {
    describe('[ sync-data-consumer ]', function () {
      /**
       * Consuming 'lazy-sync-stream', using 'sync-data' consumer
       * every 'this.push' inside readable, results in 'data' event,
       * so data arrives in same order and chunks
       */
      it.skip('consuming string stream, using \'data\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable()(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnDataConsumer(stream, dataSpy)

        await waitForEndOrError(stream)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })

      /**
       * Consuming 'lazy-sync-stream' in 'object-mode', using 'sync-data' consumer
       * every 'this.push' inside readable, results in 'data' event,
       * so data arrives in same order and chunks
       */
      it.skip('consuming string stream, using \'data\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable()(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnDataConsumer(stream, dataSpy)

        await waitForEndOrError(stream)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })
    })

    describe('[ sync-readable-consumer ]', function () {
      /**
       * Consuming 'lazy-sync-stream', using 'eager-sync-readable' consumer
       * bad case, use 'lazy-readable' or 'data' consumer
       */
      it.skip('consuming string stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable()(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })

      /**
       * Consuming 'lazy-sync-stream', using 'lazy-sync-readable' consumer
       * 'string' data arrives concatenated up to 'highWaterMark',
       * resulting in small amount of 'readable' events
       */
      it.skip('consuming string stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable()(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy)

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })

      /**
       * Consuming 'lazy-sync-stream' in 'object-mode', using 'eager-sync-readable' consumer
       * every 'stream.read()' returns one object
       * you must use eager 'readable' consumer, or stream hangs
       * worst case, use 'data' consumer
       */
      it.skip('consuming object stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable()(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })
    })

    describe('[ async-readable-consumer ]', function () {
      /**
       * Consuming 'lazy-sync-stream' in 'object-mode', using 'eager-async-readable' consumer
       * you must use eager 'readable' consumer, or stream hangs
       * worst case, better use 'data' consumer
       */
      it.skip('consuming object stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable()(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { readDelayMs: 50, eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })

      /**
       * Consuming 'lazy-sync-stream', using 'lazy-async-readable' consumer
       * 'string' data arrives concatenated up to 'highWaterMark',
       * resulting in small amount of 'readable' events
       * best usage for concatable data
       */
      it.skip('should', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable()(data)
        const dataSpy = makeDataSpy()
        makeOnReadableConsumer(stream, dataSpy, { readDelayMs: 100 })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })
    })
  })

  describe('[ lazy-async-stream ]', function () {
    describe('[ sync-data-consumer ]', function () {
      /**
       * Consuming 'lazy-async-stream', using 'sync-data' consumer
       * every 'this.push' inside readable, results in 'data' event,
       * so data arrives in same order and chunks
       */
      it.skip('consuming string stream, using \'data\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ pushDelayMs: 10 })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnDataConsumer(stream, dataSpy)

        await waitForEndOrError(stream)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })

      /**
       * Consuming 'lazy-async-stream' in 'object-mode', using 'sync-data' consumer
       * every 'this.push' inside readable, results in 'data' event,
       * so data arrives in same order and chunks
       */
      it.skip('consuming string stream, using \'data\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ pushDelayMs: 10 })(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnDataConsumer(stream, dataSpy)

        await waitForEndOrError(stream)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })
    })

    describe('[ sync-readable-consumer ]', function () {
      /**
       * Consuming 'lazy-async-stream', using 'eager-sync-readable' consumer
       */
      it.skip('consuming string stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ pushDelayMs: 10 })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })

      /**
       * Consuming 'lazy-async-stream', using 'lazy-sync-readable' consumer
       */
      it.skip('consuming string stream, using \'readable\'', async function () {
        const data = makeSmallStrings()
        const stream = makeReadable({ pushDelayMs: 50 })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy)

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })

      /**
       * Consuming 'lazy-async-stream' in 'object-mode', using 'eager-sync-readable' consumer
       * every 'stream.read()' returns one object
       * you must use eager 'readable' consumer, or stream hangs
       * worst case, use 'data' consumer
       */
      it.skip('consuming object stream, using \'readable\'', async function () {
        const data = makeSmallStrings()
        const stream = makeReadable({ pushDelayMs: 50 })(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })

      /**
       * Consuming 'lazy-async-stream' in 'object-mode', using 'lazy-sync-readable' consumer
       * every 'stream.read()' returns one object
       */
      it.skip('consuming object stream, using \'readable\'', async function () {
        const data = makeSmallStrings()
        const stream = makeReadable({ pushDelayMs: 50 })(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy)

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })
    })

    describe('[ async-readable-consumer ]', function () {
      /**
       * Consuming 'lazy-async-stream', using 'eager-async-readable' consumer
       */
      it.skip('consuming string stream, using \'readable\'', async function () {
        const data = makeSmallStrings()
        const stream = makeReadable({ pushDelayMs: 10 })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { eager: true, readDelayMs: 10 })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })

      /**
       * Consuming 'lazy-async-stream', using 'lazy-async-readable' consumer
       */
      it.skip('consuming string stream, using \'readable\'', async function () {
        const data = makeSmallStrings()
        const stream = makeReadable({ pushDelayMs: 50 })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { readDelayMs: 10 })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })

      /**
       * Consuming 'lazy-async-stream' in 'object-mode', using 'eager-async-readable' consumer
       * every 'stream.read()' returns one object
       * you must use eager 'readable' consumer, or stream hangs
       * worst case, use 'data' consumer
       */
      it.skip('consuming object stream, using \'readable\'', async function () {
        const data = makeSmallStrings()
        const stream = makeReadable({ pushDelayMs: 50 })(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { eager: true, readDelayMs: 10 })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })

      /**
       * Consuming 'lazy-async-stream' in 'object-mode', using 'lazy-async-readable' consumer
       * every 'stream.read()' returns one object
       */
      it.skip('consuming object stream, using \'readable\'', async function () {
        const data = makeSmallStrings()
        const stream = makeReadable({ pushDelayMs: 50 })(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { readDelayMs: 10 })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })
    })
  })

  describe('[ eager-sync-stream ]', function () {
    describe('[ sync-data-consumer ]', function () {
      /**
       * Consuming 'eager-sync-stream', using 'sync-data' consumer
       * every 'this.push' inside readable, results in 'data' event,
       * so data arrives in same order and chunks
       */
      it('consuming string stream, using \'data\'', async function () {
        const data = makeSmallStrings(4)
        const stream = makeReadable({ eager: true })(data, { highWaterMark: 96 })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnDataConsumer(stream, dataSpy)

        await waitForEndOrError(stream)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })

      /**
       * Consuming 'eager-sync-stream' in 'object-mode', using 'sync-data' consumer
       * every 'this.push' inside readable, results in 'data' event,
       * so data arrives in same order and chunks
       */
      it.skip('consuming string stream, using \'data\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true })(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnDataConsumer(stream, dataSpy)

        await waitForEndOrError(stream)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })
    })

    describe('[ sync-readable-consumer ]', function () {
      /**
       * Consuming 'eager-sync-stream', using 'eager-sync-readable' consumer
       * bad case, use 'lazy-readable' or 'data' consumer
       */
      it.skip('consuming string stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })

      /**
       * Consuming 'eager-sync-stream', using 'lazy-sync-readable' consumer
       * 'string' data arrives concatenated up to 'highWaterMark',
       * resulting in small amount of 'readable' events
       */
      it.skip('consuming string stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy)

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })

      /**
       * Consuming 'eager-sync-stream' in 'object-mode', using 'eager-sync-readable' consumer
       * every 'stream.read()' returns one object
       * you must use eager 'readable' consumer, or stream hangs
       * worst case, use 'data' consumer
       */
      it.skip('consuming object stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true })(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })
    })

    describe('[ async-readable-consumer ]', function () {
      /**
       * Consuming 'eager-sync-stream', using 'eager-async-readable' consumer
       * you must use eager 'readable' consumer, or stream hangs
       * worst case, better use 'data' consumer
       */
      it.skip('consuming object stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { readDelayMs: 50, eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })

      /**
       * Consuming 'eager-sync-stream', using 'lazy-async-readable' consumer
       * 'string' data arrives concatenated up to 'highWaterMark',
       * resulting in small amount of 'readable' events
       * best usage for concatable data
       */
      it.skip('should', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true })(data)
        const dataSpy = makeDataSpy()
        makeOnReadableConsumer(stream, dataSpy, { readDelayMs: 100 })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })
    })
  })

  describe('[ eager-async-stream ]', function () {
    describe('[ sync-data-consumer ]', function () {
      /**
       * Consuming 'eager-async-stream', using 'sync-data' consumer
       * every 'this.push' inside readable, results in 'data' event,
       * so data arrives in same order and chunks
       */
      it('consuming string stream, using \'data\'', async function () {
        const data = makeSmallStrings(4)
        const stream = makeReadable({ eager: true, pushDelayMs: 10 })(data, { highWaterMark: 96 })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnDataConsumer(stream, dataSpy)

        await waitForEndOrError(stream)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })

      /**
       * Consuming 'eager-async-stream' in 'object-mode', using 'sync-data' consumer
       * every 'this.push' inside readable, results in 'data' event,
       * so data arrives in same order and chunks
       */
      it.skip('consuming string stream, using \'data\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true, pushDelayMs: 10 })(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnDataConsumer(stream, dataSpy)

        await waitForEndOrError(stream)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })
    })

    describe('[ sync-readable-consumer ]', function () {
      /**
       * Consuming 'eager-async-stream', using 'eager-sync-readable' consumer
       * bad case, use 'lazy-readable' or 'data' consumer
       */
      it.skip('consuming string stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true, pushDelayMs: 10 })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })

      /**
       * Consuming 'eager-async-stream', using 'lazy-sync-readable' consumer
       * 'string' data arrives concatenated up to 'highWaterMark',
       * resulting in small amount of 'readable' events
       */
      it.skip('consuming string stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true, pushDelayMs: 10 })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy)

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })

      /**
       * Consuming 'eager-async-stream' in 'object-mode', using 'eager-sync-readable' consumer
       * every 'stream.read()' returns one object
       * you must use eager 'readable' consumer, or stream hangs
       * worst case, use 'data' consumer
       */
      it.skip('consuming object stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true, pushDelayMs: 10 })(data, { objectMode: true })
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })
    })

    describe('[ async-readable-consumer ]', function () {
      /**
       * Consuming 'eager-async-stream', using 'eager-async-readable' consumer
       * you must use eager 'readable' consumer, or stream hangs
       * worst case, better use 'data' consumer
       */
      it.skip('consuming object stream, using \'readable\'', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true, pushDelayMs: 10 })(data)
        const dataSpy = makeDataSpy()
        await wait(100)
        makeOnReadableConsumer(stream, dataSpy, { readDelayMs: 50, eager: true })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data()).deep.eq(data)
        expect(dataSpy.callCount()).eq(data.length)
      })

      /**
       * Consuming 'eager-async-stream', using 'lazy-async-readable' consumer
       * 'string' data arrives concatenated up to 'highWaterMark',
       * resulting in small amount of 'readable' events
       * best usage for concatable data
       */
      it.skip('should', async function () {
        const data = makeMediumStrings()
        const stream = makeReadable({ eager: true, pushDelayMs: 10 })(data)
        const dataSpy = makeDataSpy()
        makeOnReadableConsumer(stream, dataSpy, { readDelayMs: 100 })

        await waitForEndOrError(stream, 100)
        expect(dataSpy.data().join('')).deep.eq(data.join(''))
      })
    })
  })
})
