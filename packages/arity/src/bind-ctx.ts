function bindCtx <F> (fn: F, ctx: any): F
function bindCtx (fn: any, ctx: any) {
  return (...args: any[]) => fn.apply(ctx, args)
}

export default bindCtx
