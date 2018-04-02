import { expect } from 'chai'
import * as sinon from 'sinon'
import { waitTimePromise as wait } from '@doge/helpers'
import { EventEmitter } from 'events'
import {
  onceAllPromise,
  onceRacePromise,
  on,
  onEx,
  onceRace,
  onceRaceEx,
  onceAll,
  onceRacePromiseEx
} from './events'

xdescribe('[ events ]', function () {
  describe('[ on ]', function () {
    it('should work', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = on('e1', 'e2')(spy)(ee)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1', 'value')
      sinon.assert.callCount(spy, 1)
      expect(spy.getCall(0).args[0]).eq('value')

      await wait(50)
      ee.emit('e1', 'value1')
      sinon.assert.callCount(spy, 2)
      expect(spy.getCall(1).args[0]).eq('value1')

      await wait(50)
      ee.emit('e2', 'value2')
      sinon.assert.callCount(spy, 3)
      expect(spy.getCall(2).args[0]).eq('value2')

      /* unsubscribe */
      unsub()

      ee.emit('e1')
      ee.emit('e2')
      sinon.assert.callCount(spy, 3)
    })

    it('should work with multiple ees', async function () {
      const ee0 = new EventEmitter()
      const ee1 = new EventEmitter()
      const ee2 = new EventEmitter()
      const spy = sinon.spy()
      const unsub = on('e1', 'e2')(spy)(ee0, ee1, ee2)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee0.emit('e0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee0.emit('e1', 'value')
      sinon.assert.callCount(spy, 1)
      expect(spy.getCall(0).args[0]).eq('value')

      await wait(50)
      ee1.emit('e1', 'value1')
      sinon.assert.callCount(spy, 2)
      expect(spy.getCall(1).args[0]).eq('value1')

      await wait(50)
      ee2.emit('e2', 'value2')
      sinon.assert.callCount(spy, 3)
      expect(spy.getCall(2).args[0]).eq('value2')

      /* unsubscribe */
      unsub()

      ee0.emit('e1')
      ee1.emit('e2')
      sinon.assert.callCount(spy, 3)
    })
  })

  describe('[ onEx ]', function () {
    it('should work', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onEx('e1', 'e2')(spy)(ee)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1', 'value')
      sinon.assert.callCount(spy, 1)
      expect(spy.getCall(0).args[0]).deep.eq({ value: 'value', index: 0, ee })

      await wait(50)
      ee.emit('e1', 'value1')
      sinon.assert.callCount(spy, 2)
      expect(spy.getCall(1).args[0]).deep.eq({ value: 'value1', index: 0, ee })

      await wait(50)
      ee.emit('e2', 'value2')
      sinon.assert.callCount(spy, 3)
      expect(spy.getCall(2).args[0]).deep.eq({ value: 'value2', index: 0, ee })

      /* unsubscribe */
      unsub()

      ee.emit('e1')
      ee.emit('e2')
      sinon.assert.callCount(spy, 3)
    })

    it('should work with multiple ees', async function () {
      const ee0 = new EventEmitter()
      const ee1 = new EventEmitter()
      const ee2 = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onEx('e1', 'e2')(spy)(ee0, ee1, ee2)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee0.emit('e0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee0.emit('e1', 'value')
      sinon.assert.callCount(spy, 1)
      expect(spy.getCall(0).args[0]).deep.eq({ value: 'value', index: 0, ee: ee0 })

      await wait(50)
      ee1.emit('e1', 'value1')
      sinon.assert.callCount(spy, 2)
      expect(spy.getCall(1).args[0]).deep.eq({ value: 'value1', index: 1, ee: ee1 })

      await wait(50)
      ee2.emit('e2', 'value2')
      sinon.assert.callCount(spy, 3)
      expect(spy.getCall(2).args[0]).deep.eq({ value: 'value2', index: 2, ee: ee2 })

      /* unsubscribe */
      unsub()

      ee0.emit('e1')
      ee1.emit('e2')
      sinon.assert.callCount(spy, 3)
    })
  })

  describe('[ onceRace ]', function () {
    it('should work', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceRace('e1', 'e2')(spy)(ee)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1', 'value1')
      sinon.assert.callCount(spy, 1)
      expect(spy.getCall(0).args[0]).eq('value1')

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

    it('should work with multiple ees', async function () {
      const ee0 = new EventEmitter()
      const ee1 = new EventEmitter()
      const ee2 = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceRace('e1', 'e2')(spy)(ee0, ee1, ee2)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee0.emit('e0', 'value0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee1.emit('e1', 'value1')
      sinon.assert.callCount(spy, 1)
      expect(spy.getCall(0).args[0]).eq('value1')

      await wait(50)
      ee0.emit('e1', 'value2')
      sinon.assert.callCount(spy, 1)

      await wait(50)
      ee2.emit('e2', 'value3')
      sinon.assert.callCount(spy, 1)

      /* unsubscribe */
      unsub()

      ee0.emit('e1')
      ee1.emit('e2')
      sinon.assert.callCount(spy, 1)
    })

    it('should work with early unsubscribe', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceRace('e1', 'e2')(spy)(ee)

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

  describe('[ onceRaceEx ]', function () {
    it('should work', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceRaceEx('e1', 'e2')(spy)(ee)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1', 'value1')
      sinon.assert.callCount(spy, 1)
      expect(spy.getCall(0).args[0]).deep.eq({ value: 'value1', index: 0, ee })

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

    it('should work with multiple ees', async function () {
      const ee0 = new EventEmitter()
      const ee1 = new EventEmitter()
      const ee2 = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceRaceEx('e1', 'e2')(spy)(ee0, ee1, ee2)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee0.emit('e0', 'value0')
      sinon.assert.notCalled(spy)

      await wait(50)
      ee1.emit('e1', 'value1')
      sinon.assert.callCount(spy, 1)
      expect(spy.getCall(0).args[0]).deep.eq({ value: 'value1', index: 1, ee: ee1 })

      await wait(50)
      ee0.emit('e1', 'value2')
      sinon.assert.callCount(spy, 1)

      await wait(50)
      ee2.emit('e2', 'value3')
      sinon.assert.callCount(spy, 1)

      /* unsubscribe */
      unsub()

      ee0.emit('e1')
      ee1.emit('e2')
      sinon.assert.callCount(spy, 1)
    })

    it('should work with early unsubscribe', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceRaceEx('e1', 'e2')(spy)(ee)

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
      ee.emit('e0', 'value0')
      await wait(10)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1', 'value1')
      await wait(10)
      sinon.assert.calledOnce(spy)
      expect(spy.getCall(0).args[0]).eq('value1')

      await wait(50)
      ee.emit('e2')
      await wait(10)
      sinon.assert.calledOnce(spy)
    })

    it('should resolve when one of events fires', async function () {
      const ee0 = new EventEmitter()
      const ee1 = new EventEmitter()
      const ee2 = new EventEmitter()
      const spy = sinon.spy()
      onceRacePromise('e1', 'e2')(ee0, ee1, ee2).then(spy)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee0.emit('e0', 'value0')
      await wait(10)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee1.emit('e1', 'value1')
      await wait(10)
      sinon.assert.calledOnce(spy)
      expect(spy.getCall(0).args[0]).eq('value1')

      await wait(50)
      ee2.emit('e2')
      await wait(10)
      sinon.assert.calledOnce(spy)
    })
  })

  describe('[ onceRacePromiseEx ]', function () {
    it('should resolve when one of events fires', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      onceRacePromiseEx('e1', 'e2')(ee).then(spy)

      await wait(50)
      await wait(10)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e0', 'value0')
      await wait(10)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee.emit('e1', 'value1')
      await wait(10)
      sinon.assert.calledOnce(spy)
      expect(spy.getCall(0).args[0]).deep.eq({ value: 'value1', index: 0, ee })

      await wait(50)
      ee.emit('e2')
      await wait(10)
      sinon.assert.calledOnce(spy)
    })

    it('should resolve when one of events fires', async function () {
      const ee0 = new EventEmitter()
      const ee1 = new EventEmitter()
      const ee2 = new EventEmitter()
      const spy = sinon.spy()
      onceRacePromiseEx('e1', 'e2')(ee0, ee1, ee2).then(spy)

      await wait(50)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee0.emit('e0', 'value0')
      await wait(10)
      sinon.assert.notCalled(spy)

      await wait(50)
      ee1.emit('e1', 'value1')
      await wait(10)
      sinon.assert.calledOnce(spy)
      expect(spy.getCall(0).args[0]).deep.eq({ value: 'value1', index: 1, ee: ee1 })

      await wait(50)
      ee2.emit('e2')
      await wait(10)
      sinon.assert.calledOnce(spy)
    })
  })

  describe('[ onceAll ]', function () {
    it('should work', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceAll('e1', 'e2')(spy)(ee)

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

      /* unsubscribe */
      unsub()

      ee.emit('e1')
      ee.emit('e2')
      sinon.assert.calledOnce(spy)
    })

    it('should work with early unsubscribe', async function () {
      const ee = new EventEmitter()
      const spy = sinon.spy()
      const unsub = onceAll('e1', 'e2')(spy)(ee)

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
      const spy = sinon.spy()
      onceAllPromise('event1', 'event2', 'event3')(ee).then(spy)

      await wait(150)
      sinon.assert.notCalled(spy)

      ee.emit('event0')
      await wait(10)
      sinon.assert.notCalled(spy)

      ee.emit('event1')
      await wait(10)
      sinon.assert.notCalled(spy)

      ee.emit('event2')
      await wait(10)
      sinon.assert.notCalled(spy)

      ee.emit('event3')
      await wait(10)
      sinon.assert.calledOnce(spy)
    })
  })
})
