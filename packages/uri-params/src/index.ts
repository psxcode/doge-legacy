export function setUriParams (params: any = {}, uri: string = ''): string {
  const encoded: string = Object.entries(params).reduce(uriParamsReducer, '')
  return encoded
    ? uri
      ? uri.includes('?')
        ? `${uri}&${encoded}`
        : `${uri}?${encoded}`
      : encoded
    : uri
}

function uriParamsReducer (uri: string, [key, value]: [string, string]): string {
  const chunk = `${key}=${value}`
  return uri ? `${uri}&${chunk}` : chunk
}

export function updateQueryStringParameter (uri: string, [key, value]: [string, string]): string {
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i')
  const separator = uri.includes('?') ? '&' : '?'

  return uri.match(re)
    ? uri.replace(re, `$1${key}=${value}$2`)
    : `${uri}${separator}${key}=${value}`
}
