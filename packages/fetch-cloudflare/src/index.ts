import { default as fetch, RequestInit, Response } from 'node-fetch'
import {
  base64ascii, evalChallenge, getChallengeId, getChallengeMethod, getChallengePass, getCookieSettingCode,
  isJsChallenge, isSetCookieAndReloadChallenge, modifyChallengeMethod, runCookieCode
} from './helpers'
import { URL, URLSearchParams } from 'url'
import { pipe } from '@doge/helpers'

export type FetchFn = typeof fetch

export const fetchGet = (request: FetchFn): FetchFn =>
  (url: string, opts: RequestInit = {}): Promise<Response> =>
    request(url, {
      ...opts,
      method: 'GET'
    })

export const fetchStandardHeaders = (request: FetchFn): FetchFn =>
  (url: string, opts: RequestInit = {}): Promise<Response> =>
    request(url, {
      ...opts,
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        ...opts.headers
      }
    })

export const fetchApisign = (hash: (url: string) => string) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> => {
      return request(url, {
        ...opts,
        headers: {
          ...opts.headers,
          apisign: hash(url)
        }
      })
    }

export type GetCookieFn = (url: string) => Promise<string>
export type SetCookieFn = (cookie: string, url: string) => Promise<void>

const setHeadersCookie = (opts: RequestInit, cookie: string) => ({
  ...opts,
  headers: {
    ...opts.headers,
    ...cookie ? { cookie } : {}
  }
})

export const fetchGetCookies = (getCookie: GetCookieFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      getCookie(url).then((cookie: string) =>
        request(url, setHeadersCookie(opts, cookie)))

export const fetchSetCookies = (setCookie: SetCookieFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, opts).then((resp: Response) => {
        const { url, headers } = resp
        const cookieStr = headers.get('set-cookie')
        return cookieStr
          ? setCookie(cookieStr, url).then(() => resp)
          : resp
      })

export const fetchSetCookiesAndReloadChallenge = (setCookie: SetCookieFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, opts).then((resp: Response) => {
        return resp.clone().text().then((text: string): Promise<Response> | Response => {
          if (isSetCookieAndReloadChallenge(text)) {
            const cookie = pipe(getCookieSettingCode, base64ascii, runCookieCode)(text)
            return setCookie(cookie, resp.url).then((): Promise<Response> =>
              request(url, setHeadersCookie(opts, cookie)))
          }
          return resp
        })
      })

export const fetchJsChallenge = (request: FetchFn): FetchFn =>
  (url: string, opts: RequestInit = {}): Promise<Response> =>
    request(url, opts).then((resp: Response) => {
      return resp.clone().text().then(text => {
        if (isJsChallenge(text)) {
          const { host, origin } = new URL(resp.url)
          const chVc = getChallengeId(text)
          const chPass = getChallengePass(text)
          const chAnswer = pipe(getChallengeMethod, modifyChallengeMethod, evalChallenge)(text)
          const answerUrl = new URL(`${origin}/cdn-cgi/l/chk_jschl`)
          answerUrl.search = new URLSearchParams({
            'jschl_vc': chVc,
            'jschl_answer': chAnswer + host.length,
            'pass': chPass
          })

          return request(`${answerUrl}`, {
            method: opts.method,
            headers: {
              ...opts.headers,
              referer: origin
            }
          })
        }
        return resp
      })
    })
