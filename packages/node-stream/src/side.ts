import { Transform, TransformOptions } from 'stream'

export const sideRaw = <T, R> (opts: TransformOptions) => (sideFn: (value: T) => void) =>
  new Transform({
    ...opts,
    transform (chunk: any, encoding, callback) {
      try {
        sideFn(chunk)
      } catch (e) {
        return callback(e)
      }
      callback(null, chunk)
    }
  })

export const side = sideRaw<any, any>({ objectMode: true })
