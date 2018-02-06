import { Transform, TransformOptions } from 'stream'

export const distinctRaw = <T> (opts: TransformOptions) => (isEqual: (a: T, b: T) => boolean) => {
  let lastChunk: T
  return new Transform({
    ...opts,
    transform (chunk: any, encoding, callback) {
      if (lastChunk == null || !isEqual(lastChunk, chunk)) {
        lastChunk = chunk
        this.push(lastChunk)
      }
      callback()
    }
  })
}

export const distinct = distinctRaw<any>({ objectMode: true })

const isEqual = <T>(a: T, b: T) => a === b
export const distinctUntilChangedRaw = <T>(opts: TransformOptions) => distinctRaw(opts)(isEqual)

export const distinctUntilChanged = () => distinctUntilChangedRaw<any>({ objectMode: true })
