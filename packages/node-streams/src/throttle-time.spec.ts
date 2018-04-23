import throttleTime from './throttle-time'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'

xdescribe('[ throttleTime ]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({ delayMs: 0 })({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => throttleTime(30))
})
