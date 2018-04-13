const gather = (fn: (args: any[]) => any) =>
  (...args: any[]): any => fn(args)

export default gather
