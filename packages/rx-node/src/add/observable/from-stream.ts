import { Observable } from 'rxjs/Observable'
import { fromStream as fromStreamStatic } from '../../observable/from-stream'

Observable.fromStream = fromStreamStatic

declare module 'rxjs/Observable' {
  namespace Observable {
    export let fromStream: typeof fromStreamStatic
  }
}
