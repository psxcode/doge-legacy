const constantAsync = <T> (arg: T) => () => Promise.resolve(arg)

export default constantAsync
