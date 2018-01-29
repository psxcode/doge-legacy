import { Transform, TransformOptions } from 'stream'

export const mapRaw = <T, R> (opts: TransformOptions) => (xf: (value: T) => R) =>
  new Transform({
    ...opts,
    transform (chunk: any, encoding, callback) {
      let res
      try {
        res = xf(chunk)
      } catch (e) {
        return callback(e)
      }
      callback(null, res)
    }
  })

export const map = mapRaw<any, any>({ objectMode: true })
