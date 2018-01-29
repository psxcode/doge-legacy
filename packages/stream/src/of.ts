/* tslint:disable no-empty */
import { Readable, ReadableOptions } from 'stream'

export const ofRaw = <T> (opts: ReadableOptions) => (...args: T[]) => {
  let i = 0
  return new Readable({
    ...opts,
    read () {
      while (i < args.length && this.push(args[i++])) {}
      if (i >= args.length) this.push(null)
    }
  })
}

export const of = ofRaw<any>({ objectMode: true })
