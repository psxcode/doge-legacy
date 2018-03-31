import { pipe } from '@doge/helpers'
import { skip } from './skip'
import { take } from './take'

export const slice = (numSkip: number, numTake: number) => pipe(skip(numSkip), take(numTake))
