import { pipe } from '@psxcode/compose'
import skip from './skip'
import take from './take'

const slice = (from: number, to: number) => {
  return pipe(
    from < 0
      ? take(from)
      : skip(from),
    to < 0
      ? skip(to)
      : take(to)
  )
}

export default slice
