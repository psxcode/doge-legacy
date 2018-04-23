import { Transform } from 'stream'
import filter from './filter'

const skip = (numSkip: number) => {
  let i = 0
  return filter(() => i++ >= numSkip)
}

export default skip
