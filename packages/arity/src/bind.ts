function bind <T0, R> (fn: (p0: T0) => R, p0: T0): () => R
function bind <T0, T1, R> (fn: (p0: T0, p1: T1) => R, p0: T0): (p1: T1) => R
function bind <T0, T1, R> (fn: (p0: T0, p1: T1) => R, p0: T0, p1: T1): () => R
function bind <T0, T1, T2, R> (fn: (p0: T0, p1: T1, p2: T2) => R, p0: T0): (p1: T1, p2: T2) => R
function bind <T0, T1, T2, R> (fn: (p0: T0, p1: T1, p2: T2) => R, p0: T0, p1: T1): (p2: T2) => R
function bind <T0, T1, T2, R> (fn: (p0: T0, p1: T1, p2: T2) => R, p0: T0, p1: T1, p2: T2): () => R
function bind <T0, T1, T2, T3, R> (fn: (p0: T0, p1: T1, p2: T2, p3: T3) => R, p0: T0): (p1: T1, p2: T2, p3: T3) => R
function bind <T0, T1, T2, T3, R> (fn: (p0: T0, p1: T1, p2: T2, p3: T3) => R, p0: T0, p1: T1): (p2: T2, p3: T3) => R
function bind <T0, T1, T2, T3, R> (fn: (p0: T0, p1: T1, p2: T2, p3: T3) => R, p0: T0, p1: T1, p2: T2): (p3: T3) => R
function bind <T0, T1, T2, T3, R> (fn: (p0: T0, p1: T1, p2: T2, p3: T3) => R, p0: T0, p1: T1, p2: T2, p3: T3): () => R
function bind (fn: any, ...args0: any[]) {
  return (...args1: any[]) => fn(...args0, ...args1)
}

export default bind
