import { Observable, Observer } from 'rxjs'
import { roundTimeout, ClearTimeoutFunction, TimeoutFunction } from '@doge/round-timeout'
import { pipe } from '@doge/helpers'

export type CurrentTimeFunction = (offset: number) => () => number

export const roundIntervalObservable = (timeoutFn: TimeoutFunction, clearFn: ClearTimeoutFunction, currentTimeFn: CurrentTimeFunction) =>
  (roundMs: number, offsetMs: number): Observable<number> =>
    Observable.create((observer: Observer<number>) => {
      const at = pipe(currentTimeFn(offsetMs), roundTimeout(timeoutFn, clearFn)(roundMs)(tick))
      let count = 0
      let done = false
      let timeout = at()

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
