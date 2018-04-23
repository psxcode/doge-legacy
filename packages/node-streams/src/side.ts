import { Transform, TransformOptions } from 'stream'

export const sideRaw = (opts: TransformOptions) => <T> (sideFn: (value: T) => void) =>
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

const side = sideRaw({ objectMode: true })

export default side
