import { Observable } from 'rxjs/Observable'
import { bindCtx } from '@psxcode/arity'
import { ping } from '@psxcode/wait'
import { alignTime } from '@doge/align-time'
import { Timeframe, timeframes } from './timeframes'

export const alignTimeObservable = (currentTimeGetter: () => number) =>
  (timeframe: Timeframe) => new Observable(observer =>
    ping(alignTime(currentTimeGetter)(timeframes[timeframe]))(bindCtx(observer)(observer.next)))
