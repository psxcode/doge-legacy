import { Transform, TransformOptions } from 'stream'

export const map = (opts: TransformOptions = {}) => (xf: (value: any) => any) =>
  new Transform({
    ...opts,
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

export const filter = (opts: TransformOptions = {}) => (predicate: (value: any) => boolean) =>
  new Transform({
    ...opts,
    transform (chunk, encoding, callback) {
      let res
      try {
        res = predicate(chunk)
      } catch (e) {
        return callback(e)
      }
      callback(null, res ? chunk : undefined)
    }
  })

export const reduce = (opts: TransformOptions = {}) => (reducer: (state: any, value: any) => any) => {
  let state: any
  return new Transform({
    ...opts,
    transform (chunk, encoding, callback) {
      try {
        state = reducer(state, chunk)
      } catch (e) {
        callback(e)
      }
    },
    flush (callback) {
      callback(null, state)
    }
  })
}
