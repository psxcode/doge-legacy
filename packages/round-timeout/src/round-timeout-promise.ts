import { roundTimeout } from './round-timeout'

export const roundTimeoutPromise = (wait: (cb: () => void, ms: number) => () => void) =>
  (ms: number) => {
    const at = roundTimeout(wait)(ms)
    return (initialTime: number) => new Promise((resolve) => at(resolve)(initialTime))
  }
