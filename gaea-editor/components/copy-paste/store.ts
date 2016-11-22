import { observable, inject, ViewportStore } from '../../../gaea-editor-manager/gaea-editor-manager'

export default class CopyPasteStore {
    @inject('ViewportStore') private viewport: ViewportStore

    // 存储粘贴板的存储信息
    @observable copyComponent?: FitGaea.ViewportComponentFullInfo = null
}