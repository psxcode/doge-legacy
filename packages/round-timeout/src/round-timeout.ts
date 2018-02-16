import { roundValue } from './round-value'

export const roundTimeout = (wait: (cb: () => void, ms: number) => () => void) =>
  (alignStep: number) => {
    const ceilTime = roundValue(alignStep, Math.ceil)
    return (cb: () => void) => (initialTime: number) =>
      wait(cb, Math.max(ceilTime(initialTime + 0.5) - initialTime, 0))
  }
