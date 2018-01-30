import EventEmitter = NodeJS.EventEmitter
import { bindCtx } from '@doge/helpers'

export const on = (cb: (value?: any) => void) => (...events: string[]) => (...emitters: EventEmitter[]) => {
  const cbs = new WeakMap()
  emitters.forEach(ee => cbs.set(ee, bindCtx(ee)(cb)))
  emitters.forEach(ee => events.forEach(e => ee.addListener(e, cbs.get(ee))))
  return () => {
    emitters.forEach(ee => events.forEach(e => ee.removeListener(e, cbs.get(ee))))
  }
}

export const onceRace = (cb: (value?: any) => void) => (...events: string[]) => (...emitters: EventEmitter[]) => {
  const unsub = () => emitters.forEach(ee => events.forEach(e => ee.removeListener(e, listener)))
  const listener = (val?: any) => {
    unsub()
    return cb(val)
  }
  emitters.forEach(ee => events.forEach(e => ee.addListener(e, listener)))
  return unsub
}

export const onceAll = (cb: () => void) => (...events: string[]) => (...ees: EventEmitter[]) => {
  const doneEE = new WeakMap<EventEmitter, string[]>()
  ees.forEach(ee => doneEE.set(ee, []))
  const listeners: any[] = []
  const check = () => ees.every(ee => (doneEE.get(ee) as string[]).length === events.length)

  const listener = (ee: EventEmitter, e: string) => (val?: any) => {
    const doneEvents = doneEE.get(ee) as string[]
    if (!doneEvents.includes(e)) {
      doneEE.set(ee, doneEvents.concat([e]))
      if (check()) {
        unsubscribe()
        return cb()
      }
    }
  }
  const unsubscribe = () => {
    listeners.forEach(l => l())
    listeners.length = 0
  }
  events.forEach(e => ees.forEach(ee => {
    const l = listener(ee, e)
    listeners.push(l)
    ee.addListener(e, l)
  }))
  return unsubscribe
}

export const race = (...events: string[]) => (...ees: EventEmitter[]) =>
  new Promise(resolve => {
    onceRace(resolve)(...events)(...ees)
  })

export const all = (...events: string[]) => (...ees: EventEmitter[]) =>
  new Promise(resolve => {
    onceAll(resolve)(...events)(...ees)
  })
