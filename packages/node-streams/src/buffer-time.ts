import { bufferRaw } from './buffer'
import { Transform, TransformOptions } from 'stream'
import { waitTime } from '@doge/wait'

export const bufferTimeRaw = (opts: TransformOptions) =>
  (ms: number) => bufferRaw(opts)((cb: () => void) => waitTime(cb)(ms))

const bufferTime = bufferTimeRaw({ objectMode: true })

export default bufferTime
