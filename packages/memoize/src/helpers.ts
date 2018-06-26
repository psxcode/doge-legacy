import { ICache, ISerializer } from './types'
import ObjectCache from './object-cache'

export const makeObjectCache = <V> (cache?: { [k: string]: any }): ICache<string, V> => new ObjectCache<V>(cache)

export const makeMapCache = <K, V> (): ICache<K, V> => new Map<K, V>()

export const makeWeakMapCache = <K extends object, V> (): ICache<K, V> => new WeakMap<K, V>()

export const makeJsonSerializer = <T> (): ISerializer<string, T> => (value: T) => JSON.stringify(value)

export const makeIdentitySerializer = <T> (): ISerializer<T, T> => (value: T) => value
