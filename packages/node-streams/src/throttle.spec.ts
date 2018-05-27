import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import throttle from './throttle'

const interval = (next: () => void) => {
  console.log('subscribe')
  const id = setTimeout(next, 30)
  return () => {
    console.log('clear')
    clearTimeout(id)
  }
}

xdescribe('[throttle]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({ delayMs: 0 })({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => throttle({ objectMode: true })(interval))
})
