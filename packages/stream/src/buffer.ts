import { Transform, TransformOptions } from 'stream'

export const bufferRaw = (opts: TransformOptions) =>
  (subscribeToFlush: (flush: () => void) => () => void) => {
    let buf: any[] = []
    let unsubscribe: any
    return new Transform({
      ...opts,
      transform (chunk, encoding, callback) {
        buf.push(chunk)
        if (!unsubscribe) {
          unsubscribe = subscribeToFlush(() => {
            this.push(buf)
            buf = []
          })
        }
        callback()
      },
      flush (callback) {
        unsubscribe && unsubscribe()
        callback(null, buf)
      }
    })
  }

export const buffer = bufferRaw({ objectMode: true })
