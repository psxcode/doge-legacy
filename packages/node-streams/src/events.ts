import EventEmitter = NodeJS.EventEmitter
import { bind } from '@doge/arity'
import { IEEValue } from './types'

export const on = (...events: string[]) => (cb: (value: any) => void) => (...emitters: EventEmitter[]) => {
  /* subscribe */
  emitters.forEach(ee => events.forEach(e => ee.addListener(e, cb)))
  return () => {
    emitters.forEach(ee => events.forEach(e => ee.removeListener(e, cb)))
  }
}

const toEEValue = (initial: IEEValue) => (cb: (value: any) => void) =>
  (value: any) => cb(Object.assign({}, initial, { value }))

export const onEx = (...events: string[]) => (cb: (value: IEEValue) => void) => (...emitters: EventEmitter[]) => {
  const cbs = new WeakMap<EventEmitter, any>(
    emitters.map((ee, index) => [ee, toEEValue({ value: undefined, index, ee })(cb) ] as [EventEmitter, any])
  )
  /* subscribe */
  emitters.forEach(ee => events.forEach(e => ee.addListener(e, cbs.get(ee))))
  return () => {
    emitters.forEach(ee => events.forEach(e => ee.removeListener(e, cbs.get(ee))))
  }
}

export const onceRace = (...events: string[]) => (cb: (value: any) => void) => (...emitters: EventEmitter[]) => {
  const onData = (value: any) => {
    unsubscribe()
    cb(value)
  }
  function unsubscribe () {
    emitters.forEach(ee => events.forEach(e => ee.removeListener(e, onData)))
  }
  /* subscribe */
  emitters.forEach(ee => events.forEach(e => ee.addListener(e, onData)))
  return unsubscribe
}

export const onceRaceEx = (...events: string[]) => (cb: (value: IEEValue) => void) => (...emitters: EventEmitter[]) => {
  const cbs = new WeakMap<EventEmitter, any>(
    emitters.map((ee, index) =>
      [ee, () => {
        unsubscribe()
        toEEValue({ value: undefined, index, ee })(cb)
      }] as [EventEmitter, any])
  )
  function unsubscribe () {
    emitters.forEach(ee => events.forEach(e => ee.removeListener(e, cbs.get(ee))))
  }
  /* subscribe */
  emitters.forEach(ee => events.forEach(e => ee.addListener(e, cbs.get(ee))))
  return unsubscribe
}

export const onceAll = (...events: string[]) => (cb: (values: any[]) => void) => (...emitters: EventEmitter[]) => {
  const doneEE = new WeakMap<EventEmitter, number>()
  const cbs = new WeakMap<EventEmitter, any>()
  const values = new Array(emitters.length)
  emitters.forEach(ee => doneEE.set(ee, 0))
  emitters.forEach((ee, i) => cbs.set(ee, bind(ee, i)(listener)))

  /* subscribe */
  emitters.forEach(ee => events.forEach(e => ee.once(e, cbs.get(ee))))
  return unsubscribe

  function listener (ee: EventEmitter, index: number, value: any) {
    doneEE.set(ee, (doneEE.get(ee) as number) + 1)
    values[index] = value
    if (emitters.every(ee => (doneEE.get(ee) as number) === events.length)) {
      unsubscribe()
      return cb(values)
    }
  }
  function unsubscribe () {
    emitters.forEach(ee => events.forEach(e => ee.removeListener(e, cbs.get(ee))))
  }
}

export const onceRacePromise = (...events: string[]) => (...emitters: EventEmitter[]) =>
  new Promise(resolve => {
    onceRace(...events)(resolve)(...emitters)
  })

export const onceRacePromiseEx = (...events: string[]) => (...emitters: EventEmitter[]) =>
  new Promise(resolve => {
    onceRaceEx(...events)(resolve)(...emitters)
  })

export const onceAllPromise = (...events: string[]) => (...emitters: EventEmitter[]) =>
  new Promise(resolve => {
    onceAll(...events)(resolve)(...emitters)
  })
