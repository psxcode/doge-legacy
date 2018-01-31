import EventEmitter = NodeJS.EventEmitter
import { bindCtx, all as invokeAll, voidify } from '@doge/helpers'

export const on = (cb: (value?: any) => void) => (...events: string[]) => (...emitters: EventEmitter[]) => {
  const cbs = new WeakMap<EventEmitter, any>(
    emitters.map(ee => [ee, bindCtx(ee)(cb)] as [EventEmitter, any])
  )
  /* subscribe */
  emitters.forEach(ee => events.forEach(e => ee.addListener(e, cbs.get(ee))))
  return () => {
    emitters.forEach(ee => events.forEach(e => ee.removeListener(e, cbs.get(ee))))
  }
}

export const onceRace = (cb: (value?: any) => void) => (...events: string[]) => (...emitters: EventEmitter[]) => {
  const cbs = new WeakMap<EventEmitter, any>(
    emitters.map(ee => [ee, voidify(invokeAll(unsubscribe, bindCtx(ee)(cb)))] as [EventEmitter, any])
  )
  function unsubscribe () {
    emitters.forEach(ee => events.forEach(e => ee.removeListener(e, cbs.get(ee))))
  }
  /* subscribe */
  emitters.forEach(ee => events.forEach(e => ee.addListener(e, cbs.get(ee))))
  return unsubscribe
}

export const onceAll = (cb: () => void) => (...events: string[]) => (...emitters: EventEmitter[]) => {
  const doneEE = new WeakMap<EventEmitter, number>()
  const cbs = new WeakMap<EventEmitter, any>()
  emitters.forEach(ee => doneEE.set(ee, 0))
  emitters.forEach(ee => cbs.set(ee, bindCtx(ee)(listener)))

  /* subscribe */
  emitters.forEach(ee => events.forEach(e => ee.once(e, cbs.get(ee))))
  return unsubscribe

  function listener (this: EventEmitter) {
    doneEE.set(this, (doneEE.get(this) as number) + 1)
    if (emitters.every(ee => (doneEE.get(ee) as number) === events.length)) {
      unsubscribe()
      return cb()
    }
  }
  function unsubscribe () {
    emitters.forEach(ee => events.forEach(e => ee.removeListener(e, cbs.get(ee))))
  }
}

export const onceRacePromise = (...events: string[]) => (...ees: EventEmitter[]) =>
  new Promise(resolve => {
    onceRace(resolve)(...events)(...ees)
  })

export const onceAllPromise = (...events: string[]) => (...ees: EventEmitter[]) =>
  new Promise(resolve => {
    onceAll(resolve)(...events)(...ees)
  })
