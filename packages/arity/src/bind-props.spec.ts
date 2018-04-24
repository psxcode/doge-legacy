import { expect } from 'chai'
import bindProps from './bind-props'

const id = (value: any) => value
const addNamed = (a: string, b: string) => (p: {[k: string]: any}) => p[a] + p[b]

describe('[ bindProps ]', () => {
  it('should work as a constant', () => {
    const binded = bindProps({ value0: 0 })(id)
    expect(binded()).deep.eq({ value0: 0 })
  })

  it('should work', () => {
    const binded = bindProps({ val0: 5 })(addNamed('val0', 'val1'))
    expect(binded({ val1: 10 })).eq(15)
  })
})
