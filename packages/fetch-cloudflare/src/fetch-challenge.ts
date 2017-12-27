import {
  base64ascii, evalChallenge, getChallengeId, getChallengeMethod, getChallengePass, getCookieSettingCode, isJsChallenge,
  isSetCookieAndReloadChallenge, modifyChallengeMethod,
  runCookieSettingCode
} from './helpers'
import { URL, URLSearchParams } from 'url'
import { FetchFn, SetCookieFn } from './types'
import { Request, RequestInit, Response } from 'node-fetch'
import { pipe } from '@doge/helpers'

export const fetchSetCookiesAndReloadChallenge = (setCookie: SetCookieFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, opts).then((resp: Response) => {
        return resp.clone().text().then((text: string): Promise<Response> | Response => {
          if (isSetCookieAndReloadChallenge(text)) {
            const cookie = pipe(getCookieSettingCode, base64ascii, runCookieSettingCode)(text)
            return setCookie(cookie, resp.url).then(() => request(url, opts))
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
          answerUrl.search = `${new URLSearchParams({
            'jschl_vc': chVc,
            'jschl_answer': `${chAnswer + host.length}`,
            'pass': chPass
          })}`

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
