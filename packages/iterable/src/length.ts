/* tslint:disable no-var-keyword one-variable-per-declaration */
import { iterate } from './iterate'

export const length = (maxLength: number) => <T> (iterable: Iterable<T>): number => {
  for (var i = 0, it = iterate(iterable); i < maxLength && !it.next().done; ++i);
  return i
}
