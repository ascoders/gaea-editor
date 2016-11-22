import { observable } from '../../../gaea-editor-manager/gaea-editor-manager'

export default class EditorEventStore {
    /**
     * 当前修改是第几个
     */
    @observable currentEditPropsIndex?: number = null as number

    /**
     * 编辑状态下，属于是否属于 web 事件
     */
    currentEditIsWeb = false
    currentEditEventIndex = 0

    temporaryOriginProps?: FitGaea.ComponentProps = null
}