import { Writable, WritableOptions } from 'stream'
import * as debug from 'debug'
import { wait } from './test-helpers'
import { isPositiveNumber } from './helpers'

export interface IWritableConsumer {
  writeDelayMs?: number
  errorAtStep?: number
}

export const makeWritable = ({ writeDelayMs, errorAtStep }: IWritableConsumer = {}) => {
  const dbg = debug('stream-test:writable')
  return (onData: (data: any) => void, opts: WritableOptions = {}) => {
    let i = 0

    const syncHandler = (chunk: string | Buffer, encoding: string, cb: (err: any) => void) => {
      onData(chunk)
      if (i === errorAtStep) {
        dbg('returning an error at %d', i)
        cb(new Error(`error at step ${i}`))
      } else {
        cb(null)
      }
      ++i
    }

    const asyncHandler = (chunk: string | Buffer, encoding: string, cb: (err: any) => void) => {
      dbg('async write')
      wait(Number(writeDelayMs))
        .then(() => {
          dbg('actual write %d', i)
          syncHandler(chunk, encoding, cb)
        })
    }

    const syncFinal = (cb: () => void) => {
      dbg('final at %d', i)
      cb()
    }

    const asyncFinal = (cb: () => void) => {
      dbg('async final started')
      wait(Number(writeDelayMs)).then(() => {
        syncFinal(cb)
      })
    }

    return new Writable({
      ...opts,
      write: isPositiveNumber(writeDelayMs)
        ? asyncHandler
        : syncHandler,
      final: isPositiveNumber(writeDelayMs)
        ? asyncFinal
        : syncFinal
    })
  }
}
