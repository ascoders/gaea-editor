import { action, inject, observable } from '../../../gaea-editor-manager/gaea-editor-manager'
import TabToolsComponentsStore from './store'

export default class TabToolsComponentsAction {
    @inject('TabToolsComponentsStore') private tabToolsComponents: TabToolsComponentsStore

    @observable observeClass = true

    @action('设置激活 Tab') setActiveTab(type: string) {
        this.tabToolsComponents.activeType = type
    }
}