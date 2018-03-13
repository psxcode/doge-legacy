import { round } from './round'
import { constant } from './arity'

export type SetTimeoutFn = (cb: () => void, ms: number) => any
export type ClearTimeoutFn = (id: any) => void

export const alignedTimeGetter = (currentTimeGetter: () => number) =>
  (alignTimeframe: number) => {
    const ceilTime = round(alignTimeframe, Math.ceil)
    const calcTime = (currentTime: number) => Math.max(ceilTime(currentTime + 0.5) - currentTime, 0)
    return (): number => calcTime(currentTimeGetter())
  }

export const waitRaw = (setTimeout: SetTimeoutFn, clearTimeout: ClearTimeoutFn) =>
  (timeGetter: () => number, cb: () => void) => () => {
    let done = false
    const id = setTimeout(() => done || cb(), timeGetter())
    return () => {
      done = true
      clearTimeout(id)
    }
  }

export const waitPromiseRaw = (setTimeout: SetTimeoutFn) =>
  (timeGetter: () => number) => (): Promise<any> =>
    new Promise(resolve => setTimeout(resolve, timeGetter()))

export const wait = waitRaw(setTimeout, clearTimeout)

export const waitPromise = waitPromiseRaw(setTimeout)

export const waitTime = (cb: () => void) => (ms: number) => wait(constant(ms), cb)()

export const waitTimePromise = (ms: number) => waitPromise(constant(ms))()

export const pingRaw = (waitFn: typeof wait) =>
  (timeGetter: () => number, cb: () => void) => {
    let unsub: any
    let done = false
    const wait = waitFn(timeGetter, () => {
      if (!done) {
        cb()
        unsub = wait()
      }
    })

    return () => {
      unsub = wait()
      return () => {
        done = true
        unsub()
      }
    }
  }

export const ping = pingRaw(wait)
