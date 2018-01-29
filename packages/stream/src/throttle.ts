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

export const throttleTimeRaw = (opts: TransformOptions) => (setTimeout: (cb: () => void, ms: number) => any, clearTimeout: (id: any) => void) =>
  (ms: number) => {
    let lastChunk: any
    let inProgress = false
    let timeoutId: any
    return new Transform({
      ...opts,
      transform (chunk, encoding, callback) {
        lastChunk = chunk
        if (!inProgress) {
          inProgress = true
          timeoutId = setTimeout(() => {
            inProgress = false
            if (lastChunk != null) {
              this.push(lastChunk)
              lastChunk = undefined
            }
          }, ms)
        }
        callback()
      },
      flush (callback) {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        callback(null, lastChunk)
      }
    })
  }

export const throttleTime = throttleTimeRaw({ objectMode: true })