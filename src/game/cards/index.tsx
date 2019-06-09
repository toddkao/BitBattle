// @ts-ignore
import camelCase from 'lodash/camelCase'
// @ts-ignore
const requireModule = require.context('./', true, /\.tsx$/)
const modules = {}
// @ts-ignore
requireModule.keys().forEach(fileName => {
  if (fileName.startsWith('./get-') || fileName === './index.tsx') return
  console.log(fileName);
  const moduleName = camelCase(fileName.replace(/(\.\/|\.tsx)/g, ''))
  // @ts-ignore
  modules[moduleName] = requireModule(fileName).default
})
export default modules
