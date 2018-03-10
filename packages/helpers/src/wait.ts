export type SetTimeoutFn = (cb: () => void, ms: number) => any
export type ClearTimeoutFn = (id: any) => void

export const waitRaw = (setTimeout: SetTimeoutFn, clearTimeout: ClearTimeoutFn) =>
  (timeGetter: () => number, cb: () => void) => () => {
    const id = setTimeout(cb, timeGetter())
    return () => {
      clearTimeout(id)
    }
  }

export const waitPromiseRaw = (setTimeout: SetTimeoutFn) =>
  (timeGetter: () => number) => (): Promise<any> =>
    new Promise(resolve => setTimeout(resolve, timeGetter()))

export const wait = waitRaw(setTimeout, clearTimeout)

export const waitPromise = waitPromiseRaw(setTimeout)

export const pingRaw = (setTimeout: SetTimeoutFn, clearTimeout: ClearTimeoutFn) =>
  (timeGetter: () => number, cb: () => void) => {
    let id: any
    let done = false
    const handle = () => {
      if (!done) {
        cb()
        id = setTimeout(handle, timeGetter())
      }
    }
    return () => {
      id = setTimeout(handle, timeGetter())
      return () => {
        done = true
        clearTimeout(id)
      }
    }
  }

export const ping = pingRaw(setTimeout, clearTimeout)
