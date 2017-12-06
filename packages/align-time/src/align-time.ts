import { alignValue } from './align-value'

export type TimeoutFunction = (cb: Function, ms: number) => any
export type ClearTimeoutFunction = (id: number) => void

export const alignTime = (timeoutFn: TimeoutFunction, clearFn: ClearTimeoutFunction) =>
  (alignStep: number) => {
    const ceilTime = alignValue(alignStep, Math.ceil)
    return (cb: () => void) => (initialTime: number) => {
      let deltaTime = Math.max(ceilTime(initialTime) - initialTime, 0)
      deltaTime = deltaTime < 1 ? (ceilTime(initialTime + 1) - initialTime) : deltaTime
      const timeoutId = timeoutFn(cb, deltaTime)
      return () => clearFn(timeoutId)
    }
  }

export const alignTimePromise = (timeoutFn: TimeoutFunction, clearFn: ClearTimeoutFunction) =>
  (ms: number) => {
    const at = alignTime(timeoutFn, clearFn)(ms)
    return (initialTime: number) => new Promise((resolve) => at(resolve)(initialTime))
  }
