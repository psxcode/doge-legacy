import * as debug from 'debug'
import { EventEmitter } from 'events'

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const waitForEnd = (ee: EventEmitter, ms = 10) => new Promise((resolve, reject) => {
  const startedAt = Date.now()
  ee.on('end', () => {
    debug('stream-test:wait-for-end')('ended within %dms', Date.now() - startedAt)
    wait(ms).then(resolve)
  })
  ee.on('error', () => {
    debug('stream-test:wait-for-end')('error within %dms', Date.now() - startedAt)
    wait(ms).then(reject)
  })
})

export interface TestFn {
  (str: string): void
  callCount (): number
  data (): string[]
}

export const makeSpy = (): TestFn => {
  let callCount = 0
  let data: string[] = []
  const dbg = debug('stream-test:data-spy')
  const spy = (str: string) => {
    dbg('consume \'%s\' at %d', str, callCount)
    data.push(str)
    ++callCount
  }
  (spy as TestFn).callCount = () => callCount;
  (spy as TestFn).data = () => data
  return (spy as TestFn)
}

export const makeSingleString = () => ['test']
export const makeSmallStrings = (repeat = 1) =>
  `my simple small test`
    .repeat(repeat).split(' ')
export const makeMediumStrings = (repeat = 1) =>
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
    .repeat(5)
    .repeat(repeat).split(' ')
export const makeLargeStrings = (repeat = 1) =>
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
    .repeat(40)
    .repeat(repeat).split(' ')
