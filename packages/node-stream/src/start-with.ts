import { ReadableOptions } from 'stream'
import { ofRaw } from './of'
import { concatRaw } from './concat'
import ReadableStream = NodeJS.ReadableStream

export const startWithRaw = <T>(opts: ReadableOptions) => (...values: T[]) => (stream: ReadableStream) =>
  concatRaw(opts)(ofRaw<T>(opts)(...values), stream)

export const startWith = startWithRaw<any>({ objectMode: true })
