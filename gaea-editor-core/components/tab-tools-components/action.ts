import {injectable, action, lazyInject} from '../../../gaea-editor-manager/gaea-editor-manager'

import TabToolsComponentsStore from './store'

@injectable()
export default class TabToolsComponentsAction {
    @lazyInject(TabToolsComponentsStore) private tabToolsComponents: TabToolsComponentsStore

    @action('设置激活 Tab') setActiveTab(type: string) {
        this.tabToolsComponents.activeType = type
    }
}