import { Observable } from 'rxjs/Observable'
import { bindCtx, ping, alignedTimeGetter } from '@doge/helpers'
import { Timeframe, timeframes } from './timeframes'

export const alignTimeObservable = (currentTimeGetter: () => number) => {
  const timeGetter = alignedTimeGetter(currentTimeGetter)
  return (timeframe: Timeframe) => new Observable(observer =>
    ping(timeGetter(timeframes[timeframe]), bindCtx(observer)(observer.next)))
}
