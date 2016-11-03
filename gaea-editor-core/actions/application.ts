import {injectable} from 'inversify'
import {action} from 'mobx'
import ApplicationStore from '../stores/application'
import {lazyInject} from '../utils/kernel'

@injectable()
export default class ApplicationAction {
    @lazyInject(ApplicationStore) private application: ApplicationStore


}