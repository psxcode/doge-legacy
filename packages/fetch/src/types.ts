import { default as fetch } from 'node-fetch'
import { CookieJar } from 'tough-cookie'

export type FetchFn = typeof fetch
export type HashFn = (arg: string) => string

export type RequestCookiesFn = (currentUrl: string, options?: CookieJar.GetCookiesOptions) => string
export type ResponseCookiesFn = (cookie: string, currentUrl: string, options?: CookieJar.SetCookieOptions) => void
