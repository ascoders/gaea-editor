import { action, inject, observable } from '../../../gaea-editor-manager/gaea-editor-manager'

import PublishStore from './store'

export default class PublishAction {
    @inject('PublishStore') private publish: PublishStore

    @observable observeClass = true

    @action('修改当前版本') updateVersion(version: string) {
        this.publish.currentVersion = version
    }
}