import { Transform, TransformOptions } from 'stream'

export const throttleRaw = (opts: TransformOptions) => (subscribeToInterval: (doNext: () => void) => () => void) => {
  let lastChunk: any
  let unsubscribe: any
  return new Transform({
    ...opts,
    transform (chunk, encoding, callback) {
      lastChunk = chunk
      if (unsubscribe == null) {
        unsubscribe = subscribeToInterval(() => {
          if (lastChunk != null) {
            this.push(lastChunk)
            lastChunk = undefined
          }
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

export const throttleTime = throttleTimeRaw({ objectMode: true })
