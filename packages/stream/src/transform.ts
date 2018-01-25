import { Transform, TransformOptions } from 'stream'

export type StreamTransformFn = (chunk: any, encoding: string, callback: Function) => void
export type StreamFlush = (callback: Function) => any

export const mapTransform = (xf: (value: any) => any): StreamTransformFn =>
  (chunk, encoding, callback) => {
    let res
    try {
      res = xf(chunk)
    } catch (e) {
      return callback(e)
    }
    callback(null, res)
  }

export const mapStream = (opts: TransformOptions = {}) => (xf: (value: any) => any) =>
  new Transform({
    ...opts,
    transform: mapTransform(xf)
  })

export const filterTransform = (predicate: (value: any) => boolean): StreamTransformFn =>
  (chunk, encoding, callback) => {
    let res
    try {
      res = predicate(chunk)
    } catch (e) {
      return callback(e)
    }
    callback(null, res ? chunk : undefined)
  }

export const filterStream = (opts: TransformOptions = {}) => (predicate: (value: any) => boolean) =>
  new Transform({
    ...opts,
    transform: filterTransform(predicate)
  })

export const reduceStream = (opts: TransformOptions = {}) => (reducer: (state: any, value: any) => any) => {
  let state: any
  return new Transform({
    ...opts,
    transform (chunk, encoding, callback) {
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
