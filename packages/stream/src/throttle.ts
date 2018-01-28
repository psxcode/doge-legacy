import { Transform } from 'stream'

export const throttle = (subscribeToInterval: (doNext: () => void) => () => void) => {
  let lastChunk: any
  let unsubscribe: any
  return new Transform({
    objectMode: true,
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
