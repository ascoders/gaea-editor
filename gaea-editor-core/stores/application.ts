import {injectable} from 'inversify'
import {observable} from 'mobx'

@injectable()
export default class ApplicationStore {
    // 导航栏高度
    @observable navbarHeight = 40
}