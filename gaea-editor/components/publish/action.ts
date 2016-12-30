import {action, inject, observable, ApplicationStore} from '../../../gaea-editor-manager/gaea-editor-manager'

import PublishStore from './store'

export default class PublishAction {
    @inject('PublishStore') private publish: PublishStore
    @inject('ApplicationStore') private applicationStore: ApplicationStore

    @observable observeClass = true

    onInit() {
        this.publish.currentVersion = this.applicationStore.editorProps && this.applicationStore.editorProps.currentVersion
    }

    @action('修改当前版本') updateVersion(version: string) {
        this.publish.currentVersion = version
    }
}