import { Request, RequestInit, Response } from 'node-fetch'
import { URL, URLSearchParams } from 'url'
import { FetchFn } from '../types'
import { pipe } from '@psxcode/compose'
import {
  evalChallenge,
  getChallengeId,
  getChallengeMethod,
  getChallengePass,
  isJsChallenge,
  modifyChallengeMethod
} from './helpers'

const solveJsChallengeMethod = pipe(getChallengeMethod, modifyChallengeMethod, evalChallenge)

export const fetchJsChallenge = (request: FetchFn): FetchFn =>
  (url: string, opts: RequestInit = {}): Promise<Response> =>
    request(url, opts).then((resp: Response) => {
      const { status, url } = resp
      return status === 503
        ? resp.clone().text().then(text => {
          if (isJsChallenge(text)) {
            const { host, origin } = new URL(url)
            const chVc = getChallengeId(text)
            const chPass = getChallengePass(text)
            const chAnswer = solveJsChallengeMethod(text)
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
        : resp
    })
