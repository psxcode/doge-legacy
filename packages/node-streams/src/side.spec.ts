import { expect } from 'chai'
import {
  makeNumbers,
  makeStrings,
  readable,
  transformTest,
  writable
} from '@psxcode/node-streams-test'
import side from './side'

const multiply = (multiplier: number) => (value: number) => value * multiplier

xdescribe('[ side ]', () => {
  transformTest<string>(makeStrings(8),
    (data) => readable({})({ encoding: 'utf8' })(data),
    (spy) => writable({})({ decodeStrings: false })(spy),
    () => side(x => x),
    (data, spy) => {
      expect(spy.callCount()).eq(Array.from(data).length)
    })

  transformTest<number>(makeNumbers(4),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => side(multiply(2)),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
