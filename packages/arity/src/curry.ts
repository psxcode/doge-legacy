function curry <A, RET> (fn: (p0: A) => RET): (p0: A) => RET
function curry <A, B, RET> (fn: (p0: A, p1: B) => RET): (p0: A) => (p1: B) => RET
function curry <A, B, C, RET> (fn: (p0: A, p1: B, p2: C) => RET): (p0: A) => (p1: B) => (p2: C) => RET
function curry <A, B, C, D, RET> (fn: (p0: A, p1: B, p2: C, p3: D) => RET): (p0: A) => (p1: B) => (p2: C) => (p3: D) => RET
function curry <A, B, C, D, E, RET> (fn: (p0: A, p1: B, p2: C, p3: D, p4: E) => RET): (p0: A) => (p1: B) => (p2: C) => (p3: D) => (p4: E) => RET
function curry <A, B, C, D, E, F, RET> (fn: (p0: A, p1: B, p2: C, p3: D, p4: E, p5: F) => RET): (p0: A) => (p1: B) => (p2: C) => (p3: D) => (p4: E) => (p5: F) => RET
function curry <A, B, C, D, E, F, G, RET> (fn: (p0: A, p1: B, p2: C, p3: D, p4: E, p5: F, p6: G) => RET): (p0: A) => (p1: B) => (p2: C) => (p3: D) => (p4: E) => (p5: F) => (p6: G) => RET
function curry <A, B, C, D, E, F, G, H, RET> (fn: (p0: A, p1: B, p2: C, p3: D, p4: E, p5: F, p6: G, p7: H) => RET): (p0: A) => (p1: B) => (p2: C) => (p3: D) => (p4: E) => (p5: F) => (p6: G) => (p7: G) => RET
function curry (fn: any) {
  const args: any[] = []
  return function curried (arg: any) {
    args.push(arg)
    return args.length < fn.length ? curried : fn(...args)
  }
}

export default curry
