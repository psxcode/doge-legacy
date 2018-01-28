import { Transform } from 'stream'
import { map } from './map'

export const pluck = (propName: string) => {
  return map((value: any) => value[propName])
}
