import * as debugFactory from 'debug'
import { Readable, ReadableOptions } from 'stream'

export const readableFromStringsBlockingAsync = (delay = 0) => {
  const debug = debugFactory('stream-test:from-strings-blocking-async')
  let inProgress = false
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read more at %d', i)
        if (inProgress) {
          // debug('already in progress at pos %d', i)
          return
        }
        inProgress = true
        setTimeout(() => {
          debug('blocking pushes begin at %d', i)
          while (true) {
            if (i >= data.length) {
              debug('data complete at %d', i)
              this.push(null)
              break
            }
            debug('pushing %d', i)
            if (!this.push(data[i++])) {
              debug('backpressure at %d', i - 1)
              break
            }
          }
          inProgress = false
        }, delay)
      }
    })
  }
}

export const readableFromStringsBlockingAsyncErrorContinue = (delay = 0, errorAtStep = 0) => {
  const debug = debugFactory('stream-test:from-strings-blocking-async-error-continue')
  let inProgress = false
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read more at %d', i)
        if (inProgress) {
          // debug('already in progress at pos %d', i)
          return
        }
        inProgress = true
        setTimeout(() => {
          debug('blocking pushes begin at %d', i)
          while (true) {
            if (i >= data.length) {
              debug('data complete at %d', i)
              this.push(null)
              break
            }
            if (i === errorAtStep) {
              debug('emitting error at %d', i)
              this.emit('error', new Error(`error at ${i}`))
            }
            debug('pushing %d', i)
            if (!this.push(data[i++])) {
              debug('backpressure at %d', i - 1)
              break
            }
          }
          inProgress = false
        }, delay)
      }
    })
  }
}

export const readableFromStringsBlockingAsyncErrorBreak = (delay = 0, errorAtStep = 0) => {
  const debug = debugFactory('stream-test:from-strings-blocking-async-error-break')
  let inProgress = false
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read more at %d', i)
        if (inProgress) {
          // debug('already in progress at pos %d', i)
          return
        }
        inProgress = true
        setTimeout(() => {
          debug('blocking pushes begin at %d', i)
          while (true) {
            if (i >= data.length) {
              debug('data complete at %d', i)
              this.push(null)
              break
            }
            if (i === errorAtStep) {
              debug('breaking error at %d', i)
              this.emit('error', new Error(`error at ${i}`))
              this.push(null)
              break
            }
            debug('pushing %d', i)
            if (!this.push(data[i++])) {
              debug('backpressure at %d', i - 1)
              break
            }
          }
          inProgress = false
        }, delay)
      }
    })
  }
}

export const readableFromStringsBlockingAsyncErrorHang = (delay = 0, errorAtStep = 0) => {
  const debug = debugFactory('stream-test:from-strings-blocking-async-error-hang')
  let inProgress = false
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read more at %d', i)
        if (inProgress) {
          // debug('already in progress at pos %d', i)
          return
        }
        inProgress = true
        setTimeout(() => {
          debug('blocking pushes begin at %d', i)
          while (true) {
            if (i >= data.length) {
              debug('data complete at %d', i)
              this.push(null)
              break
            }
            if (i === errorAtStep) {
              debug('breaking error at %d', i)
              this.emit('error', new Error(`error at ${i}`))
              break
            }
            debug('pushing %d', i)
            if (!this.push(data[i++])) {
              debug('backpressure at %d', i - 1)
              break
            }
          }
          inProgress = false
        }, delay)
      }
    })
  }
}
