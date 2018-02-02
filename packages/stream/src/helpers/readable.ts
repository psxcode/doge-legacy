/* tslint:disable no-conditional-assignment no-empty */
import * as debug from 'debug'
import { Readable, ReadableOptions } from 'stream'
import { wait, isPositiveNumber } from './helpers'

export interface IMakeReadableOptions {
  errorAtStep?: number
  errorBehavior?: 'break' | 'continue',
  delayMs?: number
  eager?: boolean
}

export const makeReadable = <T> ({ errorAtStep, errorBehavior, eager, delayMs }: IMakeReadableOptions) =>
  (readableOptions: ReadableOptions) => {
    const dbg = debug('stream-test:readable')
    return (iterator: Iterator<T>, maxLength = 0) => {
      let i = 0
      let inProgress = false
      const push = function (this: Readable, iteratorResult: IteratorResult<T>, i: number) {
        if (isPositiveNumber(errorAtStep) && i === errorAtStep) {
          dbg('emitting error at %d', i)
          this.emit('error', new Error(`emitting error at ${i}`))
          if (errorBehavior === 'break') {
            this.push(null)
            return null
          }
        }
        if (iteratorResult.done || (maxLength > 0 && i >= maxLength)) {
          dbg('complete at %d', i)
          this.push(null)
          return null
        }
        dbg('push %d', i)
        const res = this.push(iteratorResult.value === null
          ? undefined
          : iteratorResult.value)
        if (!res) {
          dbg('backpressure at %d', i)
        }
        return res
      }
      const syncHandler = function (this: Readable) {
        if (inProgress) return
        if (eager) {
          dbg('eager read requested %d', i)
          inProgress = true
          dbg('eager read begin at %d', i)
          while (push.call(this, iterator.next(), i++)) {}
          dbg('eager read end at %d', i - 1)
          inProgress = false
        } else {
          dbg('lazy read requested %d', i)
          push.call(this, iterator.next(), i++)
        }
      }
      const asyncHandler = function (this: Readable) {
        if (inProgress) return
        dbg('async read')
        wait(delayMs as number).then(() => {
          dbg('actual read %d', i)
          syncHandler.call(this)
        })
      }
      const readable = new Readable({
        ...readableOptions,
        read: isPositiveNumber(delayMs)
          ? asyncHandler
          : syncHandler
      })
      readable.on('removeListener', (name) => {
        dbg('removeListener for %s', name)
      })
      readable.on('newListener', (name) => {
        dbg('newListener for %s', name)
      })
      return readable
    }
  }
