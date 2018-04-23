import { Readable, ReadableOptions } from 'stream'
import { UnsubFn, WaitFn } from './types'

export const ofAsyncRaw = (opts: ReadableOptions) =>
  (wait: WaitFn) => <T> (...values: T[]) => {
    let i = 0
    let unsubscribe: UnsubFn
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

const ofAsync = ofAsyncRaw({ objectMode: true })

export default ofAsync
