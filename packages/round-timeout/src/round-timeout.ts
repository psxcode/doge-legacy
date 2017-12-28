import { roundValue } from './round-value'
import { CallbackFn, ClearTimeoutFunction, SetTimeoutFunction } from './types'

export const roundTimeout = (timeoutFn: SetTimeoutFunction, clearFn: ClearTimeoutFunction) =>
  (alignStep: number) => {
    const ceilTime = roundValue(alignStep, Math.ceil)
    return (cb: CallbackFn) => (initialTime: number) => {
      const timeoutId = timeoutFn(cb, Math.max(ceilTime(initialTime + 0.5) - initialTime, 0))
      return () => clearFn(timeoutId)
    }
  }
