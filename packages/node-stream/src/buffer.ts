import { Transform, TransformOptions } from 'stream'
import { bind, constant } from '@doge/arity'
import { wait } from '@doge/wait'

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

export const buffer = bufferRaw({ objectMode: true })

export const bufferTimeRaw = (opts: TransformOptions) =>
  (ms: number) => bufferRaw(opts)(bind(constant(ms))(wait))

export const bufferTime = bufferTimeRaw({ objectMode: true })
