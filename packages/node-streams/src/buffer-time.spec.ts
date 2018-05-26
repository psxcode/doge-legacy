import {
  makeNumbers,
  readable,
  transformTest,
  writable
} from '@psxcode/node-streams-test'
import bufferTime from './buffer-time'

xdescribe('[ bufferTime ]', () => {
  transformTest<number>(
    makeNumbers(4),
    data => readable({ delayMs: 5 })({ objectMode: true })(data),
    spy => writable({})({ objectMode: true })(spy),
    () => bufferTime(30)
  )
})
