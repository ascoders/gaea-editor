import { observable, inject, ApplicationStore } from '../../../gaea-editor-manager/gaea-editor-manager'

export default class PublishStore {
    @inject('ApplicationStore') private application: ApplicationStore

    // 当前版本号
    @observable currentVersion = '0.0.0'
}