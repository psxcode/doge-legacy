import { Transform, TransformOptions } from 'stream'

export const filterRaw = <T> (opts: TransformOptions) => (predicate: (value: T) => boolean) =>
  new Transform({
    ...opts,
    transform (chunk: any, encoding, callback) {
      let res = false
      try {
        res = predicate(chunk)
      } catch (e) {
        return callback(e)
      }
      callback(null, res ? chunk : undefined)
    }
  })

const filter = filterRaw<any>({ objectMode: true })

export default filter
