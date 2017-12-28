import { Request, RequestInit, Response } from 'node-fetch'
import { pipe } from '@doge/helpers'
import { FetchFn, ResponseCookiesFn } from '../types'
import {
  base64ascii,
  getCookieSettingCode,
  isSetCookieAndReloadChallenge,
  runCookieSettingCode
} from './helpers'

const solveCookieSettingChallenge = pipe(getCookieSettingCode, base64ascii, runCookieSettingCode)

export const fetchSetCookiesChallenge = (setCookie: ResponseCookiesFn) =>
  (request: FetchFn): FetchFn =>
    (url: string, opts: RequestInit = {}): Promise<Response> =>
      request(url, opts).then((resp: Response) => {
        return resp.clone().text().then((text: string): Promise<Response> | Response => {
          if (isSetCookieAndReloadChallenge(text)) {
            const cookie = solveCookieSettingChallenge(text)
            if (cookie) {
              setCookie(cookie, resp.url)
            }
          }
          return resp
        })
      })
