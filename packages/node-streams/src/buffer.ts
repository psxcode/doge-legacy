import { Transform, TransformOptions } from 'stream'
import { UnsubFn, WaitFn } from './types'

export const bufferRaw = (opts: TransformOptions) =>
  (wait: WaitFn) => {
    let buf: any[] = []
    let unsubscribe: UnsubFn
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
