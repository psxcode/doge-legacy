/* tslint:disable no-conditional-assignment no-empty */
import * as debug from 'debug'
import { Readable, ReadableOptions } from 'stream'
import { wait } from './test-helpers'

export interface IMakeReadableOptions {
  errorAtStep?: number
  errorBehavior?: 'break' | 'continue',
  pushDelayMs?: number
  eager?: boolean
}

export const makeReadable = <T> ({ errorAtStep, errorBehavior, eager, pushDelayMs }: IMakeReadableOptions = {}) => {
  const dbg = debug('stream-test:readable')
  return (data: T[], opts: ReadableOptions = {}) => {
    let i = 0
    let inProgress = false
    const push = function (this: Readable, data: T[], i: number) {
      if (isFinite(errorAtStep) && i === errorAtStep) {
        dbg('emitting error at %d', i)
        this.emit('error', new Error(`emitting error at ${i}`))
        if (errorBehavior === 'break') {
          this.push(null)
          return null
        }
      }
      if (i >= data.length) {
        dbg('complete at %d', i)
        this.push(null)
        return null
      } else {
        dbg('push %d', i)
        const res = this.push(data[i])
        if (!res) {
          dbg('backpressure at %d', i)
        }
        return res
      }
    }
    const syncHandler = function (this: Readable) {
      if (eager) {
        dbg('eager read requested %d', i)
        if (inProgress) return
        inProgress = true
        dbg('eager read begin at %d', i)
        while (push.call(this, data, i++)) {}
        dbg('eager read end at %d', i - 1)
        inProgress = false
      } else {
        dbg('lazy read requested %d', i)
        push.call(this, data, i)
        ++i
      }
    }
    const asyncHandler = function (this: Readable) {
      dbg('async read')
      wait(pushDelayMs).then(() => {
        dbg('actual read %d', i)
        syncHandler.call(this)
      })
    }
    return new Readable({
      encoding: 'utf8',
      ...opts,
      read: isFinite(Number(pushDelayMs)) && pushDelayMs >= 0
        ? asyncHandler
        : syncHandler
    })
  }
}
