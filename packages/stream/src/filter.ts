import { Transform } from 'stream'

export const filter = (predicate: (value: any) => boolean) =>
  new Transform({
    objectMode: true,
    transform (chunk, encoding, callback) {
      let res = false
      try {
        res = predicate(chunk)
      } catch (e) {
        return callback(e)
      }
      callback(null, res ? chunk : undefined)
    }
  })
