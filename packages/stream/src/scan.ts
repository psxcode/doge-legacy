import { Transform, TransformOptions } from 'stream'

export const scanRaw = <T, R> (opts: TransformOptions) => (reducer: (state: any, value: any) => any) => {
  let state: any
  return new Transform({
    ...opts,
    transform (chunk, encoding, callback) {
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
