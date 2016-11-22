import { action, inject, observable } from '../../../gaea-editor-manager/gaea-editor-manager'
import * as LZString from 'lz-string'

import TabToolsComponentsComboStore from './store'

export default class TabToolsComponentsComboAction {
    @inject('TabToolsComponentsComboStore') private tabToolsComponentsCombo: TabToolsComponentsComboStore

    @observable observeClass = true

    @action('添加一个模板') addCombo(name: string, info: FitGaea.ViewportComponentFullInfo) {
        this.tabToolsComponentsCombo.comboList.push({
            name,
            source: LZString.compressToBase64(JSON.stringify(info))
        })
    }
}