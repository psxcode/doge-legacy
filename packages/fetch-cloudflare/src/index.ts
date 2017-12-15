import { default as fetch, Request, RequestInit, Response } from 'node-fetch'
import {
  evalChallenge,
  getChallengeId, getChallengeMethod, getChallengePass, isJsChallenge,
  modifyChallengeMethod
} from './helpers'
import { URL } from 'url'

export type FetchFn = typeof fetch

export const fetchGet =
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, { ...opts, method: 'GET' })

export const fetchApisign = (hash: (url: string) => string) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> => {
      const { headers = {} } = opts
      return request(url, {
        ...opts,
        headers: {
          ...headers,
          apisign: hash(url)
        }
      })
    }

export type GetCookieFn = (url: string) => Promise<string>
export type SetCookieFn = (cookie: string, url: string) => Promise<void>

export const fetchCookies = (getCookie: GetCookieFn, setCookie: SetCookieFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      getCookie(url)
        .then((cookie: string) => {
          const { headers = {} } = opts
          return request(url, {
            ...opts,
            headers: {
              ...headers,
              ...cookie ? { cookie } : {}
            }
          })
        })
        .then((resp: Response) => {
          const { url, headers } = resp
          const cookieStr = headers.get('set-cookie') || ''
          return cookieStr
            ? setCookie(cookieStr, url).then(() => resp)
            : resp
        })

export const fetchCloudflare = (request: FetchFn): FetchFn =>
  (url: string, opts: RequestInit = {}): Promise<Response> =>
    request(url, opts).then((resp: Response) => {
      return resp.text().then(text => {
        if (isJsChallenge(text)) {
          const { host, href, protocol } = new URL(resp.url)
          const chVc = getChallengeId(text)
          const chPass = getChallengePass(text)
          const chMethod = getChallengeMethod(text)
          const chMethodModified = modifyChallengeMethod(chMethod)
          const chAnswer = evalChallenge(chMethodModified)
          const chAnswerAdded = chAnswer + host.length
          const chAnswerResponse = {
            'jschl_vc': chVc,
            'jschl_answer': chAnswerAdded,
            'pass': chPass
          }
          const answerUrl = `${protocol}//${host}/cdn-cgi/l/chk_jschl`

          return request(answerUrl, {
            method: opts.method
          })
        }
        return resp
      })
    })
