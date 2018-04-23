import { debounceRaw } from './debounce'
import { Transform, TransformOptions } from 'stream'
import { waitTime } from '@doge/wait'

export const debounceTimeRaw = (opts: TransformOptions) =>
  (ms: number) => debounceRaw(opts)((cb: () => void) => waitTime(cb)(ms))

const debounceTime = debounceTimeRaw({ objectMode: true })

export default debounceTime
