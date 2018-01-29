import { Transform } from 'stream'
import { filter } from './filter'

export const take = (numTake: number) => {
  let i = 0
  return filter(() => i++ < numTake)
}