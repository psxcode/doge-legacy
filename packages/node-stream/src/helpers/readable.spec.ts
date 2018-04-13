import {
  makeMediumStrings,
  makeSmallStrings,
  makeOnDataConsumer,
  makeOnReadableConsumer,
  makeReadableTest,
  xmakeReadableTest,
  expectSameCallCount,
  expectSameData
} from './helpers'
import { makeReadable } from './readable'
import { iterate } from '@doge/iterable'

/**
 * LAZY-PRODUCER
 * on every _read() pushes one chunk with 'this.push()'
 * Node just calls _read() until internal buffer is full
 * works fine with both 'data' and 'readable' consumer
 * Node respects highWaterMark, by stopping calling _read()
 */

/**
 * EAGER-PRODUCER
 * on first _read() repeats 'this.push()' until internal buffer is full
 * works fine with both 'data' and 'readable' consumer
 * highWaterMark limits amount of pushed data, by returning 'false' from 'this.push()'
 */

/**
 * ASYNC-PRODUCER
 * on _read() does not immediately 'this.push()' the chunk
 * Node will NOT call _read() again, until 'this.push()' invoked
 * On next 'this.push()', Node will immediately call _read() again
 * In LAZY-ASYNC this is ok (pushes chunks one-by-one after every _read())
 * In EAGER-ASYNC, special guard value should be used
 */

describe('[ stream-test / readable ]', function () {
  this.slow(1000)

  /**
   * DATA CONSUMER
   * for every 'this.push()', there will be 'data' event giving corresponding chunk
   * Balanced behavior
   * Good for any type of data
   * Best for 'object-mode'
   */
  describe('[ data consumer ]', function () {
    /**
     * for every single 'push' one 'data' event
     */
    /* LAZY-SYNC-PRODUCER */
    xmakeReadableTest(makeSmallStrings(2),
      (data) => makeReadable({})({ encoding: 'utf8' })(iterate(data)),
      makeOnDataConsumer,
      expectSameCallCount)

    /**
     * allows several 'push'es up to highWaterMark
     * then begins sending 'data' event
     * number os 'data' equals number of 'push'
     */
    /* EAGER-SYNC-PRODUCER */
    xmakeReadableTest(makeSmallStrings(3),
      (data) => makeReadable({ eager: true })({ encoding: 'utf8', highWaterMark: 64 })(iterate(data)),
      makeOnDataConsumer,
      expectSameCallCount)

    /**
     * for every EAGER 'push' there is synchronous 'data' event
     * highWaterMark is not needed
     */
    /* EAGER-ASYNC-PRODUCER */
    xmakeReadableTest(makeSmallStrings(5),
      (data) => makeReadable({ eager: true, delayMs: 20 })({ encoding: 'utf8' })(iterate(data)),
      makeOnDataConsumer,
      expectSameCallCount)
  })

  /**
   * EAGER-READABLE CONSUMER
   * On 'readable' event starts 'stream.read()' until there is no data left
   * every 'stream.read()' invokes 'readable.read()',
   * and if stream is lazy, it returns chunk, so 'stream.read()' immediately returns that chunk
   * This forces stream to give all its data, one-by-one
   * Then series of 'readable' events continues to be emitted from stream
   * Then stream 'ends'
   * Bad, not optimal
   */
  describe('[ eager-readable consumer ]', function () {
    /* EAGER-SYNC-PRODUCER */
    xmakeReadableTest(makeMediumStrings(),
      (data) => makeReadable({ eager: true })({  encoding: 'utf8', highWaterMark: 64 })(iterate(data)),
      (stream, spy) => makeOnReadableConsumer(stream, spy, { eager: true }),
      expectSameData)
  })

  /**
   * LAZY-READABLE CONSUMER
   * On 'readable' event makes one 'stream.read'
   * Allows buffered data to arrive in one large chunk
   * Good for concatenatable data (strings, buffers)
   * Bad for 'object-mode', stream never ends
   */
  describe('[ lazy-readable consumer ]', function () {
    /* EAGER-SYNC-PRODUCER */
    xmakeReadableTest(makeMediumStrings(),
      (data) => makeReadable({ eager: true })({ encoding: 'utf8' })(iterate(data)),
      (stream, spy) => makeOnReadableConsumer(stream, spy, {}),
      expectSameData)
  })

  /**
   * LAZY-ASYNC-READABLE CONSUMER
   * 'readable' event arrives immediately after first 'this.push()'
   * Consuming this chunk, with stream.read(),
   * means stream becomes empty, and you wait for the next 'readable'
   * You can postpone stream.read(), allowing stream to fill its buffer
   * highWaterMark works perfectly here, affects 'readable' event count
   * Best for concatenatable data (strings, buffers)
   * Bad for 'object-mode', stream never ends
   */
  describe('[ lazy-async-readable consumer ]', function () {
    /* EAGER-SYNC-PRODUCER */
    xmakeReadableTest(makeMediumStrings(),
      (data) => makeReadable({ eager: true })({ encoding: 'utf8' })(iterate(data)),
      (stream, spy) => makeOnReadableConsumer(stream, spy, { delayMs: 0 }),
      expectSameData)
  })
})
