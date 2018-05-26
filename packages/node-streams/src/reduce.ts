import { Transform, TransformOptions } from 'stream'

export const reduceRaw = (opts: TransformOptions) => <T, R> (reducer: (state: R, value: T) => R) => {
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
      callback(undefined, state)
    }
  })
}

const reduce = reduceRaw({ objectMode: true })

export default reduce
