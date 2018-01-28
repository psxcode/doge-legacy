import { Transform } from 'stream'

export const last = () => {
  let value: any
  return new Transform({
    objectMode: true,
    transform (chunk, encoding, callback) {
      value = chunk
      callback()
    },
    flush (callback) {
      callback(null, value)
    }
  })
}
