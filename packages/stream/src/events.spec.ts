import { EventEmitter } from 'events'
import { all, race } from './events'
import { wait } from './helpers/helpers'

xdescribe('[ events ]', function () {
  describe('[ race ]', function () {
    it('should resolve when one of events fires', async function () {
      const ee = new EventEmitter()

      const promise = race('event1', 'event2', 'event3')(ee)

      await wait(50)
      ee.emit('event1')

      return promise
    })
  })

  describe('[ all ]', function () {
    it('should resolve when all of events fires', async function () {
      const ee = new EventEmitter()

      const promise = all('event1', 'event2', 'event3')(ee)

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
