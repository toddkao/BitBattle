// @ts-ignore
const requireModule = require.context('./', true, /\.tsx$/)
const array = requireModule.keys()
  .filter((name: string) => !name.startsWith('./get-') && name !== './index.tsx')
  .map((name: string) => {
    return requireModule(name).default
  })
export default array
