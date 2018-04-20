import { Readable, ReadableOptions } from 'stream'
import { wait } from '@doge/wait'
import { ofAsyncRaw } from './of-async'

export const ofTimeRaw = (opts: ReadableOptions) =>
  (ms: number) => ofAsyncRaw(opts)(wait(() => ms))

const ofTime = ofTimeRaw({ objectMode: true })

export default ofTime
