import { roundValue } from './round-value'

export type TimeoutFunction = (cb: Function, ms: number) => any
export type ClearTimeoutFunction = (id: any) => void
export type CallbackFn = () => void

export const roundTimeout = (timeoutFn: TimeoutFunction, clearFn: ClearTimeoutFunction) =>
  (alignStep: number) => {
    const ceilTime = roundValue(alignStep, Math.ceil)
    return (cb: CallbackFn) => (initialTime: number) => {
      const timeoutId = timeoutFn(cb, Math.max(ceilTime(initialTime + 0.5) - initialTime, 0))
      return () => clearFn(timeoutId)
    }
  }

export const roundTimeoutPromise = (timeoutFn: TimeoutFunction, clearFn: ClearTimeoutFunction) =>
  (ms: number) => {
    const at = roundTimeout(timeoutFn, clearFn)(ms)
    return (initialTime: number) => new Promise((resolve) => at(resolve)(initialTime))
  }
