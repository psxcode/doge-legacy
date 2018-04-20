import { Readable, ReadableOptions } from 'stream'

export const ofAsyncRaw = (opts: ReadableOptions) =>
  (wait: (cb: () => void) => () => void) => <T> (...values: T[]) => {
    let i = 0
    let unsubscribe: any
    return new Readable({
      ...opts,
      read () {
        if (!unsubscribe) {
          unsubscribe = wait(() => {
            unsubscribe = undefined
            this.push(i < values.length ? values[i++] : null)
          })
        }
      },
      destroy () {
        unsubscribe && unsubscribe()
      }
    })
  }

const ofAsync = ofAsyncRaw({ objectMode: true })

export default ofAsync
