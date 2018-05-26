import { Transform, TransformOptions } from 'stream'
import { waitTime } from '@doge/wait'
import { bufferRaw } from './buffer'

export const bufferTimeRaw = (opts: TransformOptions) => (ms: number) =>
  bufferRaw(opts)(cb => waitTime(cb)(ms))

const bufferTime = bufferTimeRaw({ objectMode: true })

export default bufferTime
