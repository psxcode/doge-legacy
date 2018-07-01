type T = string | number | boolean | undefined | null | void | {}

function tuple<A extends T, B extends T, C extends T, D extends T, E extends T, F extends T, G extends T, H extends T, I extends T, J extends T, K extends T, L extends T> (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L): [A, B, C, D, E, F, G, H, I, J, K, L]
function tuple<A extends T, B extends T, C extends T, D extends T, E extends T, F extends T, G extends T, H extends T, I extends T, J extends T, K extends T> (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K): [A, B, C, D, E, F, G, H, I, J, K]
function tuple<A extends T, B extends T, C extends T, D extends T, E extends T, F extends T, G extends T, H extends T, I extends T, J extends T> (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J): [A, B, C, D, E, F, G, H, I, J]
function tuple<A extends T, B extends T, C extends T, D extends T, E extends T, F extends T, G extends T, H extends T, I extends T> (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I): [A, B, C, D, E, F, G, H, I]
function tuple<A extends T, B extends T, C extends T, D extends T, E extends T, F extends T, G extends T, H extends T> (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H): [A, B, C, D, E, F, G, H]
function tuple<A extends T, B extends T, C extends T, D extends T, E extends T, F extends T, G extends T> (a: A, b: B, c: C, d: D, e: E, f: F, g: G): [A, B, C, D, E, F, G]
function tuple<A extends T, B extends T, C extends T, D extends T, E extends T, F extends T> (a: A, b: B, c: C, d: D, e: E, f: F): [A, B, C, D, E, F]
function tuple<A extends T, B extends T, C extends T, D extends T, E extends T> (a: A, b: B, c: C, d: D, e: E): [A, B, C, D, E]
function tuple<A extends T, B extends T, C extends T, D extends T> (a: A, b: B, c: C, d: D): [A, B, C, D]
function tuple<A extends T, B extends T, C extends T> (a: A, b: B, c: C): [A, B, C]
function tuple<A extends T, B extends T> (a: A, b: B): [A, B]
function tuple<A extends T> (a: A): [A]
function tuple (...args: any[]): any[] {
  return args
}

export default tuple
