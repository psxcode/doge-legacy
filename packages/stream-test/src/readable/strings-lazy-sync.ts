import * as debugFactory from 'debug'
import { Readable, ReadableOptions } from 'stream'

export interface IMakeReadableOptions {
  errorAtStep?: number
  errorBehavior?: 'break' | 'continue',
  eager?: boolean
}

export const readableStringsLazySync = ({ errorAtStep, errorBehavior }: IMakeReadableOptions = {}) => {
  const debug = debugFactory('stream-test:strings-lazy-sync')
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        if (isFinite(errorAtStep) && i === errorAtStep) {
          debug('emitting error at %d', i)
          this.emit('error', new Error(`emitting error at ${i}`))
          if (errorBehavior === 'break') {
            this.push(null)
            return
          }
        }
        if (i >= data.length) {
          debug('complete at %d', i)
          this.push(null)
          return
        } else {
          debug('read %d', i)
          this.push(data[i++])
          const res = this.push(data[i++])
          if (!res) {
            debug('backpressure at %d', i - 1)
            return
          }
        }
      }
    })
  }
}

export const readableStringsEagerSync = ({ errorAtStep, errorBehavior }: IMakeReadableOptions = {}) => {
  const debug = debugFactory('stream-test:from-strings-blocking-sync')
  return (data: string[] = [], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read at %d', i)
        while (true) {
          if (isFinite(errorAtStep) && i === errorAtStep) {
            debug('emitting error at %d', i)
            this.emit('error', new Error(`emitting error at ${i}`))
            if (errorBehavior === 'break') {
              this.push(null)
              break
            }
          }
          if (i >= data.length) {
            debug('complete at %d', i)
            this.push(null)
            break
          } else {
            debug('read %d', i)
            const res = this.push(data[i++])
            if (!res) {
              debug('backpressure at %d', i - 1)
              break
            }
          }
        }
      }
    })
  }
}
