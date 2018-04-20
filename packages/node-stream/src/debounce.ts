import { Transform, TransformOptions } from 'stream'

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

const debounce = debounceRaw({ objectMode: true })

export default debounce
