import { Observable, Observer } from 'rxjs'
import { pipe } from '@doge/helpers'
import { roundTimeout } from './round-timeout'
import {
  ClearTimeoutFunction,
  CurrentTimeFunction,
  SetTimeoutFunction
} from './types'

export const roundIntervalObservable = (setTimeoutFn: SetTimeoutFunction, clearTimeoutFn: ClearTimeoutFunction, currentTimeFn: CurrentTimeFunction) =>
  (roundMs: number, offsetMs: number): Observable<number> =>
    Observable.create((observer: Observer<number>) => {
      const at = pipe(currentTimeFn(offsetMs), roundTimeout(setTimeoutFn, clearTimeoutFn)(roundMs)(tick))
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
