import { throttleRaw } from './throttle'
import { Transform, TransformOptions } from 'stream'
import { wait } from '@doge/wait'

export const throttleTimeRaw = (opts: TransformOptions) =>
  (ms: number) => throttleRaw(opts)(wait(() => ms))

const throttleTime = throttleTimeRaw({ objectMode: true })

export default throttleTime
