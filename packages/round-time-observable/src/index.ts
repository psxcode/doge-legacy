import { Observable, Observer } from 'rxjs'
import { roundTimeout, ClearTimeoutFunction, TimeoutFunction } from '@doge/round-timeout'

export type CurrentTimeFunction = (offset: number) => () => number
const pipe = (...functions: any[]): any => {
  const [fn, ...fns] = functions
  return (...args: any[]) => fns.length ? pipe(...fns)(fn(...args)) : fn(...args)
}

export const roundIntervalObservable = (timeoutFn: TimeoutFunction, clearFn: ClearTimeoutFunction, currentTimeFn: CurrentTimeFunction) =>
  (roundMs: number, offsetMs: number): Observable<number> =>
    Observable.create((observer: Observer<number>) => {
      const at = pipe(currentTimeFn(offsetMs), roundTimeout(timeoutFn, clearFn)(roundMs)(tick))
      let count = 0
      let done = false
      let timeout: Function | undefined

      /* make early call if alignStep is long */
      timeout = at()

      /* return unsubscribe function */
      return () => {
        done = true
        timeout && timeout()
      }

      function tick () {
        timeout = void 0
        observer.next(count++)
        // check if 'done' was set during 'next' call
        if (!done) {
          timeout = at()
        }
      }
    })
