import { Transform, TransformOptions } from 'stream'

export type StreamTransformFn = (chunk: any, encoding: string, callback: Function) => void
export type StreamFlushFn = (callback: Function) => any

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

export const map = (xf: (value: any) => any) =>
  new Transform({
    objectMode: true,
    transform: mapTransform(xf)
  })

export const filterTransform = (predicate: (value: any) => boolean): StreamTransformFn =>
  (chunk, encoding, callback) => {
    let res = false
    try {
      res = predicate(chunk)
    } catch (e) {
      return callback(e)
    }
    callback(null, res ? chunk : undefined)
  }

export const filter = (predicate: (value: any) => boolean) =>
  new Transform({
    objectMode: true,
    transform: filterTransform(predicate)
  })

export const reduce = (reducer: (state: any, value: any) => any) => {
  let state: any
  return new Transform({
    objectMode: true,
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

export const scan = (reducer: (state: any, value: any) => any) => {
  let state: any
  return new Transform({
    objectMode: true,
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

export const skip = (numSkip: number) => {
  let i = 0
  return filter(() => i++ >= numSkip)
}

export const take = (numTake: number) => {
  let i = 0
  return filter(() => i++ < numTake)
}

export const pluck = (propName: string) => {
  return map((value: any) => value[propName])
}

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

export const throttleTime = (opts: TransformOptions = {}) => (propName: string) => {

}
