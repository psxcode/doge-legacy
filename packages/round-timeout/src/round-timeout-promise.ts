import { ClearTimeoutFunction, SetTimeoutFunction } from './types'
import { roundTimeout } from './round-timeout'

export const roundTimeoutPromise = (timeoutFn: SetTimeoutFunction, clearFn: ClearTimeoutFunction) =>
  (ms: number) => {
    const at = roundTimeout(timeoutFn, clearFn)(ms)
    return (initialTime: number) => new Promise((resolve) => at(resolve)(initialTime))
  }
