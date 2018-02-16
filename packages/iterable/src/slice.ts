import { pipe } from '@doge/helpers'
import { skip } from './skip'
import { take } from './take'

export const slice = <T> (numSkip: number, numTake: number) => pipe(skip<T>(numSkip), take<T>(numTake))
