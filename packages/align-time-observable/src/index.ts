import { Observable, Observer } from 'rxjs'
import { alignTime, ClearTimeoutFunction, TimeoutFunction } from '@doge/align-time'

export type CurrentTimeFunction = (offset: number) => () => number
const noop = () => void 0
const pipe = (fn: Function = noop, ...fns: Function[]): any =>
  (...args: any[]) => fns.length ? pipe(...fns)(fn(...args)) : fn(...args)

export const alignIntervalObservable = (timeoutFn: TimeoutFunction, clearFn: ClearTimeoutFunction, currentTimeFn: CurrentTimeFunction) =>
  (alignMs: number, offsetMs: number) =>
    Observable.create((observer: Observer<number>) => {
      const at = pipe(currentTimeFn(offsetMs), alignTime(timeoutFn, clearFn)(alignMs)(tick))
      let count = 0
      let timeout: Function

      /* make early call if alignStep is long */
      if (alignMs > 1000) {
        timeoutFn(tick, 0)
      }

      return () => {
        timeout && timeout()
        observer.complete()
      }

      function tick () {
        observer.next(count++)
        timeout = at()
      }
    })
