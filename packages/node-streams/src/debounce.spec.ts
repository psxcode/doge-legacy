import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import debounce from './debounce'

const interval = (next: () => void) => {
  console.log('subscribe')
  const id = setTimeout(next, 30)
  return () => {
    console.log('clear')
    clearTimeout(id)
  }
}

xdescribe('[debounce]', () => {
  transformTest<number>(makeNumbers(4),
    (data) => readable({ delayMs: 0 })({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => debounce(interval))
})
