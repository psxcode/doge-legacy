import { Transform, TransformOptions } from 'stream'

export const bufferRaw = (opts: TransformOptions) =>
  (wait: (cb: () => void) => () => void) => {
    let buf: any[] = []
    let unsubscribe: any
    return new Transform({
      ...opts,
      transform (chunk, encoding, callback) {
        buf.push(chunk)
        if (!unsubscribe) {
          unsubscribe = wait(() => {
            unsubscribe = undefined
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

const buffer = bufferRaw({ objectMode: true })

export default buffer
