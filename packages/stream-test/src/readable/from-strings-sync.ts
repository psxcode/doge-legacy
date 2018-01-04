import * as debugFactory from 'debug'
import { Readable, ReadableOptions } from 'stream'

export const readableFromStringsSync = () => {
  const debug = debugFactory('stream-test:from-strings-sync')
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        if (i >= data.length) {
          debug('complete at %d', i)
          this.push(null)
        } else {
          debug('read %d', i)
          this.push(data[i++])
        }
      }
    })
  }
}

export const readableFromStringsSyncErrorContinue = (errorAtStep = 0) => {
  const debug = debugFactory('stream-test:from-strings-sync-error-continue')
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read %d', i)
        if (i === errorAtStep) {
          debug('emitting error at %d', i)
          this.emit('error', new Error(`emitting error at ${i}`))
        }
        this.push(i >= data.length ? null : data[i++])
      }
    })
  }
}

export const readableFromStringsSyncErrorBreak = (errorAtStep = 0) => {
  const debug = debugFactory('stream-test:from-strings-sync-error-break')
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read %d', i)
        if (i === errorAtStep) {
          debug('breaking error at %d', i)
          this.emit('error', new Error(`breaking error at ${i}`))
          this.push(null)
        } else {
          this.push(i >= data.length ? null : data[i++])
        }
      }
    })
  }
}

export const readableFromStringsSyncErrorHang = (errorAtStep = 0) => {
  const debug = debugFactory('stream-test:from-strings-sync-error-hang')
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read %d', i)
        if (i === errorAtStep) {
          debug('emitting error at %d', i)
          this.emit('error', new Error(`emitting error at ${i}`))
        } else {
          this.push(i >= data.length ? null : data[i++])
        }
      }
    })
  }
}
