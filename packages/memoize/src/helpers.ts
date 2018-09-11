import { IMemoizeCache, IMemoizeKeySerializer } from './types'
import ObjectCache from './object-cache'

export const makeObjectCache = <V> (cache?: { [k: string]: V }): IMemoizeCache<string, V> =>
  new ObjectCache<V>(cache)

export const makeMapCache = <K, V> (): IMemoizeCache<K, V> =>
  new Map<K, V>()

export const makeWeakMapCache = <K extends object, V> (): IMemoizeCache<K, V> =>
  new WeakMap<K, V>()

export const makeJsonSerializer = <T> (): IMemoizeKeySerializer<string, T> =>
  (value: T) => JSON.stringify(value)

export const makeIdentitySerializer = <T> (): IMemoizeKeySerializer<T, T> =>
  (value: T) => value
