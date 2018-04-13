import { ICache, ISerializer } from './types'

const memoize = <P, V> (cache: ICache<string, V>, serializer: ISerializer<string, P>) =>
  (fn: (arg: P) => V) => (arg: P): V => {
    const cacheKey = serializer(arg)

    if (!cache.has(cacheKey)) {
      const computedValue = fn(arg)
      cache.set(cacheKey, computedValue)
      return computedValue
    }

    return cache.get(cacheKey)!
  }

export default memoize
