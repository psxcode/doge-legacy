/* tslint:disable no-empty */
import { Readable, ReadableOptions } from 'stream'
import { wait } from '@doge/wait'
import { bind, constant } from '@doge/arity'

export const ofRaw = <T> (opts: ReadableOptions) => (...values: T[]) => {
  let i = 0
  return new Readable({
    ...opts,
    read () {
      while (i < values.length && this.push(values[i++]));
      if (i >= values.length) this.push(null)
    }
  })
}

export const of = ofRaw<any>({ objectMode: true })

export const ofAsyncRaw = <T> (opts: ReadableOptions) =>
  (wait: (cb: () => void) => () => void) => (...values: T[]) => {
    let i = 0
    let unsubscribe: any
    return new Readable({
      ...opts,
      read () {
        if (!unsubscribe) {
          unsubscribe = wait(() => {
            unsubscribe = undefined
            this.push(i < values.length ? values[i++] : null)
          })
        }
      },
      destroy () {
        unsubscribe && unsubscribe()
      }
    })
  }

export const ofAsync = ofAsyncRaw<any>({ objectMode: true })

export const ofTimeRaw = <T> (opts: ReadableOptions) =>
  (ms: number) => ofAsyncRaw<T>(opts)(bind(constant(ms))(wait))

export const ofTime = ofTimeRaw<any>({ objectMode: true })
