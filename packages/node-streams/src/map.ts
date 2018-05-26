import { Transform, TransformOptions } from 'stream'

export const mapRaw = (opts: TransformOptions) => <T, R> (xf: (value: T) => R) =>
  new Transform({
    ...opts,
    transform (chunk, encoding, callback) {
      let res
      try {
        res = xf(chunk as any)
      } catch (e) {
        return callback(e)
      }
      callback(undefined, res)
    }
  })

const map = mapRaw({ objectMode: true })

export default map
