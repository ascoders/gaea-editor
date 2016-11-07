import {injectable, observable} from '../../../gaea-editor-manager/gaea-editor-manager'

@injectable()
export default class TabToolsComponentsStore {
    // 当前激活的面板
    @observable activeType = 'common'
}