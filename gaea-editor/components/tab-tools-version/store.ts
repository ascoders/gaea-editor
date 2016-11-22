import { observable } from '../../../gaea-editor-manager/gaea-editor-manager'

export default class TabToolsVersionStore {
    /**
     * 当前版本列表页数
     */
    currentVersionPage = 0

    /**
     * 当前版本列表数组
     */
    @observable versionList: Array<FitGaea.GetPublishListResult> = []

    /**
     * 当前版本号
     */
    @observable currentVersion: string
}