import { observable } from '../../../gaea-editor-manager/gaea-editor-manager'

export default class TabToolsComponentsStore {
    // 当前激活的面板
    @observable activeType = 'common'
}