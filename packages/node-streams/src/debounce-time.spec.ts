import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import debounceTime from './debounce-time'

xdescribe('[debounceTime]', () => {
  transformTest<number>(makeNumbers(4),
    (data) => readable({ delayMs: 0 })({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => debounceTime(30))
})
