import { Observable, Observer } from 'rxjs'
import { pipe } from '@doge/helpers'
import { roundTimeout } from './round-timeout'

export const roundIntervalObservable = (wait: (cb: () => void, ms: number) => () => void, currentTimeFn: () => number) =>
  (roundMs: number): Observable<number> =>
    Observable.create((observer: Observer<number>) => {
      const at = pipe(currentTimeFn, roundTimeout(wait)(roundMs)(tick))
      let count = 0
      let done = false
      let clearFn: (() => void) | undefined = at()

      /* return unsubscribe function */
      return () => {
        done = true
        clearFn && clearFn()
      }

      function tick () {
        clearFn = undefined
        observer.next(count++)
        // check if 'done' was set during 'next' call
        if (!done) {
          clearFn = at()
        }
      }
    })
