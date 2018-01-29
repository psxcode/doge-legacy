import { Transform, TransformOptions } from 'stream'

export const reduceRaw = <T, R> (opts: TransformOptions) => (reducer: (state: R, value: T) => R) => {
  let state: any
  return new Transform({
    ...opts,
    transform (chunk: any, encoding, callback) {
      try {
        state = reducer(state, chunk)
      } catch (e) {
        return callback(e)
      }
      callback()
    },
    flush (callback) {
      callback(null, state)
    }
  })
}

export const reduce = reduceRaw<any, any>({ objectMode: true })
