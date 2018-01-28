import { Transform } from 'stream'

export const first = () => {
  let fulfilled = false
  return new Transform({
    objectMode: true,
    transform (chunk, encoding, callback) {
      callback(null, fulfilled ? undefined : chunk)
      fulfilled = true
    }
  })
}
