import { ICache, ISerializer } from './types'
import ObjectCache from './object-cache'

export const makeObjectCache = <V> (cache?: { [k: string]: any }): ICache<string, V> => new ObjectCache<V>(cache)

export const makeMapCache = <K, V> (): ICache<K, V> => new Map<K, V>()

export const makeJsonSerializer = (): ISerializer<string, any> => JSON.stringify
