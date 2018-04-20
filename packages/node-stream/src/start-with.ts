import { ReadableOptions } from 'stream'
import { ofRaw } from './of'
import { concatRaw } from './concat'
import ReadableStream = NodeJS.ReadableStream

export const startWithRaw = (opts: ReadableOptions) => <T> (...values: T[]) => (stream: ReadableStream) =>
  concatRaw(opts)(ofRaw<T>(opts)(...values), stream)

const startWith = startWithRaw({ objectMode: true })

export default startWith
