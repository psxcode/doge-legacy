export const entries = (params: { [key: string]: any } = {}) => Object.keys(params)
  .map((k: string): [string, any] => [k, params[k]])
