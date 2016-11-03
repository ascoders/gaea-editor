import 'reflect-metadata'
import {Kernel} from 'inversify'
import getDecorators from 'inversify-inject-decorators'

const myKernel = new Kernel()
const {lazyInject} = getDecorators(myKernel)

export {lazyInject}
export default myKernel