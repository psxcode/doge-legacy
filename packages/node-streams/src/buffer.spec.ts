import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import buffer from './buffer'

const interval = (next: () => void) => {
  console.log('subscribe')
  const id = setTimeout(next, 30)
  return () => {
    console.log('clear')
    clearTimeout(id)
  }
}

xdescribe('[ buffer ]', () => {
  transformTest<number>(
    makeNumbers(4),
    (data) => readable({ delayMs: 5 })({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => buffer(interval))
})
