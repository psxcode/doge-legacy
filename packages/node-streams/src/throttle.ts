import { Transform, TransformOptions } from 'stream'
import { UnsubFn, WaitFn } from './types'

export const throttleRaw = (opts: TransformOptions) =>
  (wait: WaitFn) => {
    let lastChunk: any
    let unsubscribe: UnsubFn
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

const throttle = throttleRaw({ objectMode: true })

export default throttle
