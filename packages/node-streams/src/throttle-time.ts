import { Transform, TransformOptions } from 'stream'
import { waitTime } from '@doge/wait'
import throttle from './throttle'

const throttleTime = (opts: TransformOptions) =>
  (ms: number) => throttle(opts)((cb: () => void) => waitTime(cb)(ms))

export default throttleTime
