import { roundValue } from './round-value'

export type TimeoutFunction = (cb: Function, ms: number) => any
export type ClearTimeoutFunction = (id: any) => void

export const roundTimeout = (timeoutFn: TimeoutFunction, clearFn: ClearTimeoutFunction) =>
  (alignStep: number) => {
    const ceilTime = roundValue(alignStep, Math.ceil)
    return (cb: () => void) => (initialTime: number) => {
      let deltaTime = Math.max(ceilTime(initialTime) - initialTime, 0)
      deltaTime = deltaTime < 1 ? (ceilTime(initialTime + 1) - initialTime) : deltaTime
      const timeoutId = timeoutFn(cb, deltaTime)
      return () => clearFn(timeoutId)
    }
  }

export const roundTimeoutPromise = (timeoutFn: TimeoutFunction, clearFn: ClearTimeoutFunction) =>
  (ms: number) => {
    const at = roundTimeout(timeoutFn, clearFn)(ms)
    return (initialTime: number) => new Promise((resolve) => at(resolve)(initialTime))
  }
