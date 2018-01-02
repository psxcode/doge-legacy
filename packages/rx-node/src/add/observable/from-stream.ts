import { Observable } from 'rxjs/Observable'
import {
  fromReadableStreamStatic,
  fromReadLineStreamStatic,
  fromStreamStatic,
  fromTransformStreamStatic,
  fromWritableStreamStatic
} from '../../observable/from-stream'

Observable.fromStream = fromStreamStatic
Observable.fromReadableStream = fromReadableStreamStatic
Observable.fromReadLineStream = fromReadLineStreamStatic
Observable.fromWritableStream = fromWritableStreamStatic
Observable.fromTransformStream = fromTransformStreamStatic

declare module 'rxjs/Observable' {
  namespace Observable {
    export let fromStream: typeof fromStreamStatic
    export let fromReadableStream: typeof fromReadableStreamStatic
    export let fromReadLineStream: typeof fromReadLineStreamStatic
    export let fromWritableStream: typeof fromWritableStreamStatic
    export let fromTransformStream: typeof fromTransformStreamStatic
  }
}
