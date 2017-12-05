export type Timeframe =
  '1s'
  | '5s'
  | '10s'
  | '15s'
  | '30s'
  | '1m'
  | '5m'
  | '10m'
  | '15m'
  | '30m'
  | '1h'
  | '3h'
  | '6h'
  | '12h'
  | '1d'

export const timebuckets = {
  '1s': 1000,
  '5s': 5 * 1000,
  '10s': 10 * 1000,
  '15s': 15 * 1000,
  '30s': 30 * 1000,
  '1m': 60 * 1000,
  '5m': 5 * 60 * 1000,
  '10m': 10 * 60 * 1000,
  '15m': 15 * 60 * 1000,
  '30m': 30 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '3h': 3 * 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '12h': 12 * 60 * 60 * 1000,
  '1d': 24 * 60 * 60 * 1000
}

export const roundTime = (roundStep: number, roundingOperation = Math.round) =>
  (time: number): number => new Date(roundingOperation(time / roundStep) * roundStep).getTime()

export const alignTime = (tb: Timeframe) => {
  const ms = timebuckets[tb]
  const ceilTime = roundTime(ms, Math.ceil)
  return (cb: () => void) => (initialTime: number) => {
    const deltaTime = ceilTime(initialTime) - initialTime
    return setTimeout(cb, Math.max(0, deltaTime))
  }
}

export const alignTimePromise = (tb: Timeframe) => {
  const at = alignTime(tb)
  return (initialTime: number) => new Promise((resolve) => {
    at(resolve)(initialTime)
  })
}

const currentTimeMs = (offsetMs = 0) => () => new Date().getTime() + offsetMs

/*export const alignTimeIntervalObservable = (tb: Timeframe, offsetMs = 0) => {

  return Observable.create((observer: Observer<number>) => {
    const at: () => Timer = flow([currentTimeMs(offsetMs), alignTime(tb)(tick)])
    let count = 0
    let done = false
    let timeout: Timer
    tick()

    return () => {
      done = true
      clearTimeout(timeout)
    }

    function tick() {
      if(done) {
        observer.complete()
      } else {
        observer.next(count++)
        timeout = at()
      }
    }
  })
}*/
