import { Transform, TransformOptions } from 'stream'
import { constant, bind } from '@doge/arity'
import { wait } from '@doge/wait'

export const throttleRaw = (opts: TransformOptions) =>
  (wait: (cb: () => void) => () => void) => {
    let lastChunk: any
    let unsubscribe: any
    return new Transform({
      ...opts,
      transform (chunk, encoding, callback) {
        lastChunk = chunk
        if (!unsubscribe) {
          unsubscribe = wait(() => {
            unsubscribe = undefined
            this.push(lastChunk)
            lastChunk = undefined
          })
        }
        callback()
      },
      flush (callback) {
        unsubscribe && unsubscribe()
        callback(null, lastChunk)
      }
    })
  }

export const throttle = throttleRaw({ objectMode: true })

export const throttleTimeRaw = (opts: TransformOptions) =>
  (ms: number) => throttleRaw(opts)(bind(constant(ms))(wait))

export const throttleTime = throttleTimeRaw({ objectMode: true })
