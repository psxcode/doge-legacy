export const bind = (...args1: any[]) =>
  (fn: (...args: any[]) => any) =>
    (...args2: any[]) => fn(...args1, ...args2)