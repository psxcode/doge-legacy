import { Transform, TransformOptions } from 'stream'
import { distinctRaw } from './distinct'

const isEqual = <T> (a: T, b: T) => a === b
export const distinctUntilChangedRaw = (opts: TransformOptions) => distinctRaw(opts)(isEqual)

const distinctUntilChanged = () => distinctUntilChangedRaw({ objectMode: true })

export default distinctUntilChanged
