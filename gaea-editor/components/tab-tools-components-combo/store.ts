import {injectable, observable, lazyInject, ViewportStore} from '../../../gaea-editor-manager/gaea-editor-manager'

@injectable()
export default class TabToolsComponentsComboStore {
    // 模板列表
    @observable comboList: Array<{
        name: string,
        source: string
    }> = []
}