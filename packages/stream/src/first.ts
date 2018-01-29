import { Transform, TransformOptions } from 'stream'

export const firstRaw = (opts: TransformOptions) => () => {
  let fulfilled = false
  return new Transform({
    ...opts,
    transform (chunk, encoding, callback) {
      this.push(fulfilled ? null : chunk)
      fulfilled = true
      callback()
    }
  })
}

export const first = firstRaw({ objectMode: true })
