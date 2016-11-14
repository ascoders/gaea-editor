import {injectable, action, lazyInject} from '../../../gaea-editor-manager/gaea-editor-manager'

import PublishStore from './store'

@injectable()
export default class PublishAction {
    @lazyInject(PublishStore) private publish: PublishStore

    @action('修改当前版本') updateVersion(version: string) {
        this.publish.currentVersion = version
    }
}