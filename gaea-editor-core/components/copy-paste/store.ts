import {injectable, observable, lazyInject, ViewportStore} from '../../../gaea-editor-manager/gaea-editor-manager'

@injectable()
export default class CopyPasteStore {
    @lazyInject(ViewportStore) private viewport: ViewportStore

    // 存储粘贴板的存储信息
    @observable copyComponent?: FitGaea.ViewportComponentFullInfo = null
}