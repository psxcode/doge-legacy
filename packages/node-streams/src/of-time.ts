import { Readable, ReadableOptions } from 'stream'
import { waitTime } from '@doge/wait'
import ofAsync from './of-async'

const ofTime = (opts: ReadableOptions) =>
  (ms: number) => ofAsync(opts)((cb: () => void) => waitTime(cb)(ms))

export default ofTime
