import { Transform } from 'stream'
import { map } from './map'

export const pluck = (propName: string) => {
  return map((value: {[k: string]: any}) => value[propName])
}
