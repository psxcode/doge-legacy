import { SetTimeoutFn } from './types'

export const waitPromiseRaw = (setTimeout: SetTimeoutFn) =>
  (timeGetter = () => 0) =>
    (ms = timeGetter()): Promise<any> =>
      new Promise(resolve => setTimeout(resolve, ms))

const waitPromise = waitPromiseRaw(setTimeout)

export default waitPromise
