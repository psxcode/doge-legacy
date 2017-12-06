import { alignValue } from './align-value'

export type TimeoutFunction = (cb: Function, ms: number) => any

export const alignTime = (ms: number, timeoutFunction: TimeoutFunction = setTimeout) => {
  const ceilTime = alignValue(ms, Math.ceil)
  return (cb: () => void) => (initialTime: number) => {
    let deltaTime = Math.max(ceilTime(initialTime) - initialTime, 0)
    deltaTime = deltaTime < 1 ? (ceilTime(initialTime + 1) - initialTime) : deltaTime
    return timeoutFunction(cb, deltaTime)
  }
}

export const alignTimePromise = (ms: number, timeoutFunction: TimeoutFunction = setTimeout) => {
  const at = alignTime(ms, timeoutFunction)
  return (initialTime: number) => new Promise((resolve) => at(resolve)(initialTime))
}

const currentTimeMs = (offsetMs = 0) => () => new Date().getTime() + offsetMs

/*export const alignTimeIntervalObservable = (tb: Timeframe, offsetMs = 0) => {

  return Observable.create((observer: Observer<number>) => {
    const at: () => Timer = flow([currentTimeMs(offsetMs), alignTime(tb)(tick)])
    let count = 0
    let done = false
    let timeout: Timer
    tick()

    return () => {
      done = true
      clearTimeout(timeout)
    }

    function tick() {
      if(done) {
        observer.complete()
      } else {
        observer.next(count++)
        timeout = at()
      }
    }
  })
}*/
