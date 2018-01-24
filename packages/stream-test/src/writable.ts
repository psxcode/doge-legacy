import { Writable, WritableOptions } from 'stream'
import * as debug from 'debug'
import { wait } from './test-helpers'
import { isPositiveNumber } from './helpers'

export interface IWritableConsumer {
  delayMs?: number
  errorAtStep?: number
}

export const makeWritable = ({ delayMs, errorAtStep }: IWritableConsumer = {}) =>
  (writableOptions: WritableOptions = {}) => {
    const dbg = debug('stream-test:writable')
    return (sink: (data: any) => void) => {
      let i = 0

      const syncHandler = (chunk: any, encoding: string, cb: (err: any) => void) => {
        dbg('actual write %d', i)
        sink(chunk)
        if (i === errorAtStep) {
          dbg('returning an error at %d', i)
          cb(new Error(`error at step ${i}`))
        } else {
          cb(null)
        }
        ++i
      }

      const asyncHandler = (chunk: any, encoding: string, cb: (err: any) => void) => {
        dbg('async write')
        wait(delayMs as number).then(() => syncHandler(chunk, encoding, cb))
      }

      const syncFinal = (cb: () => void) => {
        dbg('final at %d', i)
        cb()
      }

      const asyncFinal = (cb: () => void) => {
        dbg('async final started')
        wait(delayMs as number).then(() => syncFinal(cb))
      }

      return new Writable({
        ...writableOptions,
        write: isPositiveNumber(delayMs)
          ? asyncHandler
          : syncHandler,
        final: isPositiveNumber(delayMs)
          ? asyncFinal
          : syncFinal
      })
    }
  }
