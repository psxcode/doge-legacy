export type SetTimeoutFunction = (cb: Function, ms: number) => any
export type ClearTimeoutFunction = (id: any) => void
export type CallbackFn = () => void
export type CurrentTimeFunction = (offset: number) => () => number
