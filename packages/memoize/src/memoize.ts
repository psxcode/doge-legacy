import { ICache, ISerializer } from './types'

const memoize = <T, K, V> (cache: ICache<K, V>, serializer: ISerializer<K, T>) =>
  (fn: (arg: T) => V) =>
   (arg: T): V => {
     const cacheKey = serializer(arg)

     if (!cache.has(cacheKey)) {
       const computedValue = fn(arg)
       cache.set(cacheKey, computedValue)
       return computedValue
     }

     return cache.get(cacheKey)!
   }

export default memoize
