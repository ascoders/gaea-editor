import {
    action,
    inject,
    ViewportAction,
    ViewportStore,
    observable
} from '../../../gaea-editor-manager/gaea-editor-manager'

import CopyPasteStore from './store'

export default class CopyPasteAction {
    @inject('CopyPasteStore') private copyPaste: CopyPasteStore
    @inject('ViewportAction') private viewportAction: ViewportAction
    @inject('ViewportStore') private viewport: ViewportStore

    @observable observeClass = true

    @action('复制') copy(mapUniqueKey: string) {
        if (!mapUniqueKey) {
            return
        }

        this.copyPaste.copyComponent = this.viewportAction.getComponentFullInfoByMapUniqueKey(mapUniqueKey)
    }

    @action('粘贴') paste(parentMapUniqueKey: string) {
        if (!parentMapUniqueKey) {
            return false
        }

        // 粘贴板没有内容，不会拷贝
        if (!this.copyPaste.copyComponent) {
            return false
        }

        const parentComponent = this.viewport.components.get(parentMapUniqueKey)

        // 必须是布局组件
        if (!parentComponent.props.canDragIn) {
            return false
        }

        // 返回一个新 mapUniqueKey 的 copy 对象
        const newCopyComponent = this.viewportAction.createCopyComponentWithNewUniqueKey(this.copyPaste.copyComponent, parentMapUniqueKey)

        // 获得父级组件的子元素长度
        const parentChildCount = this.viewport.components.get(parentMapUniqueKey).layoutChilds.length

        this.viewportAction.addComboComponent(parentMapUniqueKey, newCopyComponent, parentChildCount)
        // TODO：记录日志

        return true
    }
}