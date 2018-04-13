import wait from './wait'

export const pingRaw = (waitFn: typeof wait) =>
  (timeGetter: () => number) =>
    (cb: () => void) => {
      let unsub: any
      let done = false
      const wait = waitFn(timeGetter)(() => {
        if (!done) {
          cb()
          unsub = wait()
        }
      })

      return () => {
        unsub = wait()
        return () => {
          done = true
          unsub()
        }
      }
    }

const ping = pingRaw(wait)

export default ping
