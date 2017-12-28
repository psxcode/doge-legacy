import { runInNewContext } from 'vm'

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
    .replace(/a\.value = (.+?) \+ .+?;/i, '$1')
    .replace(/\s+[a-z](?: = |\.i).+/g, '')
    .replace(/'; \d+'/g, '')
}

export const evalChallenge = (challenge: string): number => {
  return Number(runInNewContext(challenge))
}

export const isJsChallenge = (body: string): boolean => {
  return body.includes('a = document.getElementById(\'jschl-answer\');')
}
