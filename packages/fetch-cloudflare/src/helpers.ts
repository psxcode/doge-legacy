import { createContext, runInContext } from 'vm'

export const promisify = (f) => (...args) =>
  new Promise((resolve, reject) => f(...args, (err, val) => err ? reject(err) : resolve(val)))

export const base64ascii = (base64: string) => new Buffer(base64, 'base64').toString('ascii')

export const runCookieCode = (code: string) => {
  const sandbox = createContext({
    document: {},
    location: {
      reload: () => void 0
    }
  })
  runInContext(code, sandbox)
  return sandbox['document']['cookie']
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

export const getChallengeId = (body: string): string => {
  const match = body.match(/name="jschl_vc" value="(\w+)"/)
  return match ? match[1] : ''
}

export const getChallengePass = (body: string): string => {
  const match = body.match(/name="pass" value="(.+?)"/)
  return match ? match[1] : ''
}

export const getChallengeMethod = (body: string): string => {
  const match = body.match(/getElementById\('cf-content'\)[\s\S]+?setTimeout.+?\r?\n([\s\S]+?a\.value =.+?)\r?\n/i)
  return match ? match[1] : ''
}

export const modifyChallengeMethod = (method: string): string => {
  return method
    .replace(/a\.value =(.+?) \+ .+?;/i, '$1')
    .replace(/\s{3,}[a-z](?: = |\.).+/g, '')
    .replace(/'; \d+'/g, '')
}

export const evalChallenge = (challenge: string): number => {
  // tslint:disable-next-line
  return eval(challenge)
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

export const isJsChallenge = (body: string): boolean => {
  return body.includes('a = document.getElementById(\'jschl-answer\');')
}
