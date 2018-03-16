import { round } from './round'
import { constant } from './arity'

export type SetTimeoutFn = (cb: () => void, ms: number) => any
export type ClearTimeoutFn = (id: any) => void

const ceilValue = (ceil: (t: number) => number) =>
  (val: number) => Math.max(ceil(val + 0.5) - val, 0)

export const alignTime = (currentTimeGetter: () => number) =>
  (alignTimeframe: number) => {
    const ceilTime = ceilValue(round(alignTimeframe, Math.ceil))
    return (currentTime = currentTimeGetter()) => ceilTime(currentTime)
  }

export const waitRaw = (setTimeout: SetTimeoutFn, clearTimeout: ClearTimeoutFn) =>
  (timeGetter = constant(0)) =>
    (cb: () => void) =>
      (ms = timeGetter()) => {
        let done = false
        const id = setTimeout(() => done || cb(), ms)
        return () => {
          done = true
          clearTimeout(id)
        }
      }

export const waitPromiseRaw = (setTimeout: SetTimeoutFn) =>
  (timeGetter = constant(0)) =>
    (ms = timeGetter()): Promise<any> =>
      new Promise(resolve => setTimeout(resolve, ms))

export const wait = waitRaw(setTimeout, clearTimeout)

export const waitPromise = waitPromiseRaw(setTimeout)

export const waitTime = wait()

export const waitTimePromise = waitPromise()

export const pingRaw = (waitFn: typeof wait) =>
  (timeGetter: () => number) =>
    (cb: () => void) => {
      let unsub: any
      let done = false
      const wait = waitFn(timeGetter)(() => {
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
