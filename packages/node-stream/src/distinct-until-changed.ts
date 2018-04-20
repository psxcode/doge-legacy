import { distinctRaw } from './distinct'
import { Transform, TransformOptions } from 'stream'

const isEqual = <T> (a: T, b: T) => a === b
export const distinctUntilChangedRaw = (opts: TransformOptions) => distinctRaw(opts)(isEqual)

const distinctUntilChanged = () => distinctUntilChangedRaw({ objectMode: true })

export default distinctUntilChanged
