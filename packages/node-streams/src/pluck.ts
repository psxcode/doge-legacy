import { Transform } from 'stream'
import map from './map'

const pluck = (propName: string) => map(value => value[propName])

export default pluck
