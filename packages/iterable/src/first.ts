import { take } from './take'

export const first = <T> (iterable: Iterable<T>): Iterable<T> => take<T>(1)(iterable)
