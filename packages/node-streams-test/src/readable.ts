/* tslint:disable no-conditional-assignment no-empty */
import * as debug from 'debug'
import { Readable, ReadableOptions } from 'stream'
import isPositiveNumber from './is-positive-number'
import iterate from './iterate'

export interface IMakeReadableOptions {
  errorAtStep?: number
  errorBehavior?: 'break' | 'continue',
  delayMs?: number
  eager?: boolean
}

const id = (() => {
  let i = 0
  return () => `${i++}`
})()

const readable = ({ errorAtStep, errorBehavior, eager, delayMs }: IMakeReadableOptions) =>
  (readableOptions: ReadableOptions) => {
    const dbg = debug(`stream-test:readable${id()}`)
    return <T> (iterable: Iterable<T>) => {
      let i = 0
      let inProgress = false
      const iterator = iterate(iterable)
      const push = function (this: Readable, iteratorResult: IteratorResult<T>, i: number) {
        if (isPositiveNumber(errorAtStep) && i === errorAtStep) {
          dbg('emitting error at %d', i)
          this.emit('error', new Error(`emitting error at ${i}`))
          if (errorBehavior === 'break') {
            this.push(null)
            return null
          }
        }
        if (iteratorResult.done) {
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
        setTimeout(() => {
          dbg('actual read %d', i)
          syncHandler.call(this)
        }, delayMs as number)
      }
      const readable = new Readable({
        ...readableOptions,
        read: isPositiveNumber(delayMs)
          ? asyncHandler
          : syncHandler
      })
      readable.on('removeListener', (name) => {
        dbg('removeListener for \'%s\': %d', name, readable.listenerCount(name))
      })
      readable.on('newListener', (name) => {
        dbg('newListener for \'%s\': %d', name, readable.listenerCount(name) + 1)
      })
      return readable
    }
  }

export default readable
