import { Transform, TransformOptions } from 'stream'

export const firstRaw = (opts: TransformOptions) => () => {
  let fulfilled = false
  return new Transform({
    ...opts,
    transform (chunk, encoding, callback) {
      if (!fulfilled) {
        this.push(chunk)
        this.push(null)
        fulfilled = true
      }
      callback()
    }
  })
}

const first = firstRaw({ objectMode: true })

export default first
