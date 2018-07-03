function gather <T0, T1, R> (fn: (args: [T0, T1]) => R): (p0: T0, p1: T1) => R
function gather <T0, T1, T2, R> (fn: (args: [T0, T1, T2]) => R): (p0: T0, p1: T1, p2: T2) => R
function gather <T0, T1, T2, T3, R> (fn: (args: [T0, T1, T2, T3]) => R): (p0: T0, p1: T1, p2: T2, p3: T3) => R
function gather <T0, T1, T2, T3, T4, R> (fn: (args: [T0, T1, T2, T3, T4]) => R): (p0: T0, p1: T1, p2: T2, p3: T3, p4: T4) => R
function gather <T0, T1, T2, T3, T4, T5, R> (fn: (args: [T0, T1, T2, T3, T4, T5]) => R): (p0: T0, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5) => R
function gather <T0, T1, T2, T3, T4, T5, T6, R> (fn: (args: [T0, T1, T2, T3, T4, T5, T6]) => R): (p0: T0, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6) => R
function gather <T0, T1, T2, T3, T4, T5, T6, T7, R> (fn: (args: [T0, T1, T2, T3, T4, T5, T6, T7]) => R): (p0: T0, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, p7: T7) => R
function gather <T, R> (fn: (args: T[]) => R): (...args: T[]) => R
function gather (fn: any) {
  return (...args: any[]) => fn(args)
}

export default gather
