import { Transform, TransformOptions } from 'stream'
import { wait, bind, constant } from '@doge/helpers'

export const debounceRaw = (opts: TransformOptions) =>
  (wait: (cb: () => void) => () => void) => {
    let lastChunk: any
    let unsubscribe: any
    return new Transform({
      ...opts,
      transform (chunk, encoding, callback) {
        lastChunk = chunk
        unsubscribe && unsubscribe()
        unsubscribe = wait(() => {
          unsubscribe = undefined
          this.push(lastChunk)
          lastChunk = undefined
        })
        callback()
      },
      flush (callback) {
        unsubscribe && unsubscribe()
        callback(null, lastChunk)
      }
    })
  }

export const debounce = debounceRaw({ objectMode: true })

export const debounceTimeRaw = (opts: TransformOptions) =>
  (ms: number) => debounceRaw(opts)(bind(constant(ms))(wait))

export const debounceTime = debounceTimeRaw({ objectMode: true })
