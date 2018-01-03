import { Readable, ReadableOptions } from 'stream'
import * as debugFactory from 'debug'

export const readableFromStringsSync = () => {
  const debug = debugFactory('stream-test:from-strings-sync')
  return (data: string[] = [], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read %d', i)
        return this.push(i >= data.length ? null : data[i++])
      }
    })
  }
}

export const readableFromStringsOnePushSync = () => {
  const debug = debugFactory('stream-test:from-strings-one-push-sync')
  return (data: string[] = [], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('blocking multiple pushes in one read: begin at %d', i)
        while (true) {
          if (i >= data.length) {
            debug('data complete at %d', i)
            this.push(null)
            break
          }
          debug('pushing %d', i)
          const res = this.push(data[i++])
          if (!res) {
            debug('backpressure at %d', i - 1)
            break
          }
        }
      }
    })
  }
}

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

export const readableFromStringsOnePushAsync = (delay = 0) => {
  const debug = debugFactory('stream-test:from-strings-one-push-async')
  let inProgress = false
  return (data: string[], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        debug('read more at %d', i)
        if (inProgress) {
          return // debug('already in progress at pos %d', i)
        }
        inProgress = true
        setTimeout(() => {
          debug('blocking multiple pushes: begin at %d', i)
          while (true) {
            if (i >= data.length) {
              debug('data complete at %d', i)
              this.push(null)
              break
            }
            debug('pushing %d', i)
            const res = this.push(data[i++])
            if (!res) {
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

export const readableFromStringsErrorSync = (errorAtStep = 0) =>
  (data: string[] = [], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        if (i === errorAtStep) {
          this.emit('error', new Error(`readableFromStringsErrorSync error at step ${i}`))
        } else {
          this.push(i >= data.length ? null : data[i++])
        }
      }
    })
  }

export const readableFromStringsErrorAsync = (delay = 0, errorAtStep = 0) =>
  (data: string[] = [], opts: ReadableOptions = {}) => {
    let i = 0
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read () {
        if (i === errorAtStep) {
          this.emit('error')
        }
        this.push(i >= data.length ? null : data[i++])
      }
    })
  }
