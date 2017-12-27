import { default as fetch } from 'node-fetch'
import { CookieJar } from 'tough-cookie'

export type FetchFn = typeof fetch

export type GetCookiesFn = (currentUrl: string, options?: CookieJar.GetCookiesOptions) => string
export type SetCookiesFn = (cookie: string, currentUrl: string, options?: CookieJar.SetCookieOptions) => void
