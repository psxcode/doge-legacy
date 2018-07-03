import noop from './noop'

const isOdd = (i: number) => i % 2 !== 0
const fIsOdd = (_: any, i: number) => i % 2 !== 0
const fIsEven = (_: any, i: number) => i % 2 === 0

const swtch = (...fns: ((...args: any[]) => any)[]) => {
  if (fns.length < 2) return noop
  const dflt = isOdd(fns.length) ? fns[fns.length - 1] : noop
  const predicates = fns.slice(0, fns.length - 1).filter(fIsEven)
  const ops = fns.filter(fIsOdd)

  return <T>(arg?: T) => {
    let res: any
    predicates.some((pred, i) => pred(arg) && ((res = ops[i](arg)), true)) || (res = dflt(arg))
    return res
  }
}

export default swtch
