import { expect } from 'chai'
import {
  makeOnDataConsumer,
  makeOnReadableConsumer,
  makeReadableTest,
  makeSmallRange,
  makeSmallStrings,
  xmakeReadableTest
} from './helpers/helpers'
import ofAsync from './of-async'

describe('[ ofAsync ]', () => {
  const interval = (next: () => void) => {
    console.log('subscribe')
    const id = setTimeout(next, 30)
    return () => {
      console.log('clear')
      clearTimeout(id)
    }
  }
  xmakeReadableTest<number>(makeSmallRange(),
    (data) => ofAsync(interval)(...data),
    (readable, sink) => makeOnDataConsumer(readable, sink),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data))
    })
})
