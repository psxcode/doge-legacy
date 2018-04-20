import { debounceRaw } from './debounce'
import { Transform, TransformOptions } from 'stream'
import { wait } from '@doge/wait'

export const debounceTimeRaw = (opts: TransformOptions) =>
  (ms: number) => debounceRaw(opts)(wait(() => ms))

const debounceTime = debounceTimeRaw({ objectMode: true })

export default debounceTime
