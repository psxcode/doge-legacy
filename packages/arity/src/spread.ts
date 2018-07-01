function spread <T0, R> (fn: (p0: T0) => R): (args: [T0]) => R
function spread <T0, T1, R> (fn: (p0: T0, p1: T1) => R): (args: [T0, T1]) => R
function spread <T0, T1, T2, R> (fn: (p0: T0, p1: T1, p2: T2) => R): (args: [T0, T1, T2]) => R
function spread <T0, T1, T2, T3, R> (fn: (p0: T0, p1: T1, p2: T2, p3: T3) => R): (args: [T0, T1, T2, T3]) => R
function spread <T0, T1, T2, T3, T4, R> (fn: (p0: T0, p1: T1, p2: T2, p3: T3, p4: T4) => R): (args: [T0, T1, T2, T3, T4]) => R
function spread <T0, T1, T2, T3, T4, T5, R> (fn: (p0: T0, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5) => R): (args: [T0, T1, T2, T3, T4, T5]) => R
function spread <T0, T1, T2, T3, T4, T5, T6, R> (fn: (p0: T0, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6) => R): (args: [T0, T1, T2, T3, T4, T5, T6]) => R
function spread <T0, T1, T2, T3, T4, T5, T6, T7, R> (fn: (p0: T0, p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, p7: T7) => R): (args: [T0, T1, T2, T3, T4, T5, T6, T7]) => R
function spread <R> (fn: (...args: any[]) => R) {
  return (args: any[]): R => fn(...args)
}

export default spread
