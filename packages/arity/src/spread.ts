const spread = (fn: (...args: any[]) => any) =>
  (args: any[]): any => fn(...args)

export default spread
