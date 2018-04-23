import { throttleRaw } from './throttle'
import { Transform, TransformOptions } from 'stream'
import { waitTime } from '@doge/wait'

export const throttleTimeRaw = (opts: TransformOptions) =>
  (ms: number) => throttleRaw(opts)((cb: () => void) => waitTime(cb)(ms))

const throttleTime = throttleTimeRaw({ objectMode: true })

export default throttleTime
