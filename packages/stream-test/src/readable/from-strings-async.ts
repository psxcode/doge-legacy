import * as debugFactory from 'debug'
import { Readable, ReadableOptions } from 'stream'

export const readableFromStringsAsync = (delay = 0) => {
  const debug = debugFactory('stream-test:from-strings-async')
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read %d begin', i)
        setTimeout(() => {
          debug('push %d', i)
          return this.push(i >= data.length ? null : data[i++])
        }, delay)
      }
    })
  }
}

export const readableFromStringsAsyncErrorContinue = (delay = 0, errorAtStep = 0) => {
  const debug = debugFactory('stream-test:from-strings-async-error-continue')
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read %d begin', i)
        setTimeout(() => {
          if (errorAtStep === i) {
            debug('emitting error at %d', i)
            this.emit('error', new Error(`error at ${i}`))
          }
          debug('push %d', i)
          this.push(i >= data.length ? null : data[i++])
        }, delay)
      }
    })
  }
}

export const readableFromStringsAsyncErrorBreak = (delay = 0, errorAtStep = 0) => {
  const debug = debugFactory('stream-test:from-strings-async-error-break')
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read %d begin', i)
        setTimeout(() => {
          if (errorAtStep === i) {
            debug('breaking error at %d', i)
            this.emit('error', new Error(`error at ${i}`))
            this.push(null)
          } else {
            debug('push %d', i)
            this.push(i >= data.length ? null : data[i++])
          }
        }, delay)
      }
    })
  }
}

export const readableFromStringsAsyncErrorHang = (delay = 0, errorAtStep = 0) => {
  const debug = debugFactory('stream-test:from-strings-async-error-hang')
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read %d begin', i)
        setTimeout(() => {
          if (errorAtStep === i) {
            debug('breaking error at %d', i)
            this.emit('error', new Error(`error at ${i}`))
          } else {
            debug('push %d', i)
            this.push(i >= data.length ? null : data[i++])
          }
        }, delay)
      }
    })
  }
}
