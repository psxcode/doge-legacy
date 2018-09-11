import { IMemoizeCache, IMemoizeKeySerializer } from './types'

const memoize = <T, R, CacheKey> (
  cache: IMemoizeCache<CacheKey, R>,
  serializer: IMemoizeKeySerializer<CacheKey, T>
) =>
  (fn: (arg: T) => R) =>
    (arg: T): R => {
      const cacheKey = serializer(arg)

      if (cache.has(cacheKey)) {
        return cache.get(cacheKey) as R
      }

      const computedValue = fn(arg)
      cache.set(cacheKey, computedValue)
      return computedValue
    }

export default memoize
