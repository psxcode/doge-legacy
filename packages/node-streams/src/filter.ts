import { Transform, TransformOptions } from 'stream'

export const filterRaw = (opts: TransformOptions) => <T> (predicate: (value: T) => boolean) =>
  new Transform({
    ...opts,
    transform (chunk, encoding, callback) {
      let res = false
      try {
        res = predicate(chunk as any)
      } catch (e) {
        return callback(e)
      }
      callback(null, res ? chunk : undefined)
    }
  })

const filter = filterRaw({ objectMode: true })

export default filter
