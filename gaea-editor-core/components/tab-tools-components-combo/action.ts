import {injectable, action, lazyInject} from '../../../gaea-editor-manager/gaea-editor-manager'
import * as LZString from 'lz-string'

import TabToolsComponentsComboStore from './store'

@injectable()
export default class TabToolsComponentsComboAction {
    @lazyInject(TabToolsComponentsComboStore) private tabToolsComponentsCombo: TabToolsComponentsComboStore

    @action('添加一个模板') addCombo(name: string, info: FitGaea.ViewportComponentFullInfo) {
        this.tabToolsComponentsCombo.comboList.push({
            name,
            source: LZString.compressToBase64(JSON.stringify(info))
        })
    }
}