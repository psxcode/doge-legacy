import { Transform, TransformOptions } from 'stream'

export const scanRaw = <T, R> (opts: TransformOptions) => (reducer: (state: R, value: T) => R) => {
  let state: any
  return new Transform({
    ...opts,
    transform (chunk: any, encoding, callback) {
      try {
        state = reducer(state, chunk)
      } catch (e) {
        return callback(e)
      }
      callback(null, state)
    }
  })
}

export const scan = scanRaw<any, any>({ objectMode: true })
