import { Observable } from 'rxjs/Observable'
import { bindCtx, ping, alignTime } from '@doge/helpers'
import { Timeframe, timeframes } from './timeframes'

export const alignTimeObservable = (currentTimeGetter: () => number) =>
  (timeframe: Timeframe) => new Observable(observer =>
    ping(alignTime(currentTimeGetter)(timeframes[timeframe]))(bindCtx(observer)(observer.next)))
