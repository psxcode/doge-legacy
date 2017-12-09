import { IBittrexParams } from './types'

export const entries = (params: IBittrexParams) =>
  Object.keys(params).map((k: string) => [k, `${params[k]}`] as [string, string])
