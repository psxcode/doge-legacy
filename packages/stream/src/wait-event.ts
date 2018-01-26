import EventEmitter = NodeJS.EventEmitter

export const raceEvents = (...events: string[]) => (ee: EventEmitter) => {
  return new Promise(resolve => {
    const listener = () => {
      unsubscribe()
      resolve()
    }
    const unsubscribe = () => events.forEach((e) => ee.removeListener(e, listener))
    events.forEach((e) => ee.addListener(e, listener))
  })
}
