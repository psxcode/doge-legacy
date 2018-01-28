import { Transform } from 'stream'

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
