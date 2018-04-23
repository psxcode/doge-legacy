import { Readable, ReadableOptions } from 'stream'
import { waitTime } from '@doge/wait'
import { ofAsyncRaw } from './of-async'

export const ofTimeRaw = (opts: ReadableOptions) =>
  (ms: number) => ofAsyncRaw(opts)((cb: () => void) => waitTime(cb)(ms))

const ofTime = ofTimeRaw({ objectMode: true })

export default ofTime
