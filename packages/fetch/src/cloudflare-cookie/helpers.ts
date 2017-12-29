import { createContext, runInContext, runInNewContext } from 'vm'

export const base64ascii = (base64: string) =>
  new Buffer(base64, 'base64').toString('ascii')

export const runCookieSettingCode = (code: string): string => {
  const sandbox = createContext({
    document: {},
    location: {
      reload: () => void 0
    }
  })
  runInContext(code, sandbox)
  return (sandbox as any)['document']['cookie']
}

export const getCookieSettingCode = (body: string): string => {
  const match = body.match(/S='([^']+)'/)
  return match ? match[1] : ''
}

export const getChallengeErrorCode = (body: string): string => {
  // trying to find '<span class="cf-error-code">1006</span>'
  const match = body.match(/<\w+\s+class="cf-error-code">(.*)<\/\w+>/i)
  return match ? match[1] : ''
}

export const isCaptchaError = (body: string): boolean => {
  // Finding captcha
  return body.includes('why_captcha') || /cdn-cgi\/l\/chk_captcha/i.test(body)
}

export const isCodeError = (body: string): boolean => {
  return !!getChallengeErrorCode(body)
}

export const isSetCookieAndReloadChallenge = (body: string): boolean => {
  return body.includes('You are being redirected') ||
    body.includes('sucuri_cloudproxy_js')
}
