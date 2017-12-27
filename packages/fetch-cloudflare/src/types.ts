import { default as fetch } from 'node-fetch'

export type FetchFn = typeof fetch

export type GetCookieFn = (url: string) => Promise<string>
export type SetCookieFn = (cookie: string, url: string) => Promise<void>
