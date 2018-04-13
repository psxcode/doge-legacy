import { AnyFn, IHash } from './types'

const bindCtx = (ctx: IHash<any>) =>
  (fn: AnyFn) => (...args: any[]) => fn.apply(ctx, args)

export default bindCtx
