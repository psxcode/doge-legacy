import { expect } from 'chai'
import FixedArray from './index'

describe('[ Circular ]', () => {
  it('[ from ]', () => {
    const arr = FixedArray.from([1, 2, 3])
    expect(Array.from(arr)).deep.eq([1, 2, 3])
  })

  it('[ length ]', () => {
    const arr = FixedArray.from([1, 2, 3])
    expect(arr.length).eq(3)
  })

  it('[ fill ]', () => {
    const arr = new FixedArray<number>(3)
    expect(Array.from(arr)).deep.eq([undefined, undefined, undefined])
    arr.fill(42)
    expect(Array.from(arr)).deep.eq([42, 42, 42])
  })

  it('[ shift ]', () => {
    const arr = new FixedArray(3).fill(0)
    const res0 = arr.shift(42)
    expect(Array.from(arr)).deep.eq([0, 0, 42])
    expect(res0).eq(0)
    const res1 = arr.shift(16)
    expect(Array.from(arr)).deep.eq([0, 42, 16])
    expect(res1).eq(0)
    const res2 = arr.shift(32)
    expect(Array.from(arr)).deep.eq([42, 16, 32])
    expect(res2).eq(0)
    const res3 = arr.shift(64)
    expect(Array.from(arr)).deep.eq([16, 32, 64])
    expect(res3).eq(42)
  })

  it('[ unshift ]', () => {
    const arr = new FixedArray(3).fill(0)
    const res0 = arr.unshift(42)
    expect(Array.from(arr)).deep.eq([42, 0, 0])
    expect(res0).eq(0)
    const res1 = arr.unshift(16)
    expect(Array.from(arr)).deep.eq([16, 42, 0])
    expect(res1).eq(0)
    const res2 = arr.unshift(32)
    expect(Array.from(arr)).deep.eq([32, 16, 42])
    expect(res2).eq(0)
    const res3 = arr.unshift(64)
    expect(Array.from(arr)).deep.eq([64, 32, 16])
    expect(res3).eq(42)
  })
})