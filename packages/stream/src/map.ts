import { Transform } from 'stream'

export const map = (xf: (value: any) => any) =>
  new Transform({
    objectMode: true,
    transform (chunk, encoding, callback) {
      let res
      try {
        res = xf(chunk)
      } catch (e) {
        return callback(e)
      }
      callback(null, res)
    }
  })
