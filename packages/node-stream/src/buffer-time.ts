import { bufferRaw } from './buffer'
import { Transform, TransformOptions } from 'stream'
import { wait } from '@doge/wait'

export const bufferTimeRaw = (opts: TransformOptions) =>
  (ms: number) => bufferRaw(opts)(wait(() => ms))

const bufferTime = bufferTimeRaw({ objectMode: true })

export default bufferTime
