// @ts-ignore
const requireModule = require.context('./terrain', false, /\.tsx$/)
const array = requireModule.keys().map((name: string) => {
    return requireModule(name).default
  })
export default array
