import spread from './spread'

describe('[ spread ]', () => {
  it('should work', () => {
    const spy = (a: number, b: string, c: boolean) => 42
    const f = spread(spy)
    f([1, 'a', true])
  })
})
