import * as sinon from 'sinon'
import { EventEmitter } from 'events'
import { onceAllPromise, onceRacePromise, on, onceRace, onceAll } from './events'
import { wait } from './helpers/helpers'

xdescribe('[ events ]', function () {
  describe('[ on ]', function () {
    it('should work', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = on(spy)('e1', 'e2')(ee)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1')
      sinon.assert.callCount(spy, 1)

      await wait(50)
      ee.emit('e1')
      sinon.assert.callCount(spy, 2)

      await wait(50)
      ee.emit('e2')
      sinon.assert.callCount(spy, 3)

      /* unsubscribe */
      unsub()

      ee.emit('e1')
      ee.emit('e2')
      sinon.assert.callCount(spy, 3)
    })
  })

  describe('[ onceRace ]', function () {
    it('should work', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceRace(spy)('e1', 'e2')(ee)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1')
      sinon.assert.callCount(spy, 1)

      await wait(50)
      ee.emit('e1')
      sinon.assert.callCount(spy, 1)

      await wait(50)
      ee.emit('e2')
      sinon.assert.callCount(spy, 1)

      /* unsubscribe */
      unsub()

      ee.emit('e1')
      ee.emit('e2')
      sinon.assert.callCount(spy, 1)
    })

    it('should work', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceRace(spy)('e1', 'e2')(ee)

      await wait(50)
      sinon.assert.notCalled(spy)

      /* early unsubscribe */
      unsub()

      await wait(50)
      ee.emit('e1')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e2')
      sinon.assert.notCalled(spy)
    })
  })

  describe('[ onceRacePromise ]', function () {
    it('should resolve when one of events fires', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      onceRacePromise('e1', 'e2')(ee).then(spy)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1')
      await wait(10)
      sinon.assert.calledOnce(spy)

      await wait(50)
      ee.emit('e2')
      await wait(10)
      sinon.assert.calledOnce(spy)
    })
  })

  describe('[ onceAll ]', function () {
    it('should work', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceAll(spy)('e1', 'e2')(ee)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e2')
      sinon.assert.calledOnce(spy)

      ee.emit('e1')
      ee.emit('e2')
      sinon.assert.calledOnce(spy)
    })

    it('should work', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceAll(spy)('e1', 'e2')(ee)

      await wait(50)
      sinon.assert.notCalled(spy)

      /* early unsubscribe */
      unsub()

      await wait(50)
      ee.emit('e1')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e2')
      sinon.assert.notCalled(spy)
    })
  })

  describe('[ onceAllPromise ]', function () {
    it('should resolve when all of events fires', async function () {
      const ee = new EventEmitter()
      const promise = onceAllPromise('event1', 'event2', 'event3')(ee)

      await wait(150)
      ee.emit('event1')
      await wait(150)
      ee.emit('event2')
      await wait(300)
      ee.emit('event3')

      return promise
    })
  })
})
