const voidify = (fn: (...args: any[]) => any) =>
  (...args: any[]): void => {
    fn(...args)
  }

export default voidify
