import {injectable, observable, lazyInject, ApplicationStore} from '../../../gaea-editor-manager/gaea-editor-manager'

@injectable()
export default class PublishStore {
    @lazyInject(ApplicationStore) private application: ApplicationStore

    // 当前版本号
    @observable currentVersion = this.application.editorProps.currentVersion
}