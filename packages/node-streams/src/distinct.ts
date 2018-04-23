import { Transform, TransformOptions } from 'stream'

export const distinctRaw = (opts: TransformOptions) => <T> (isEqual: (a: T, b: T) => boolean) => {
  let lastChunk: T
  return new Transform({
    ...opts,
    transform (chunk: any, encoding, callback) {
      if (lastChunk == null || !isEqual(lastChunk, chunk)) {
        lastChunk = chunk
        this.push(lastChunk)
      }
      callback()
    }
  })
}

const distinct = distinctRaw({ objectMode: true })

export default distinct
