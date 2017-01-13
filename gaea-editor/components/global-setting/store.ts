import {observable, ApplicationStore} from '../../../gaea-editor-manager/gaea-editor-manager'

export default class GlobalSettingStore {
    /**
     * 点击编辑框移除按钮时, 是否二次确认
     */
    @observable confirmWhenRemoveComponent: boolean = true

    /**
     * 拖动时显示所有布局元素
     */
    @observable showLayout: boolean = true

    /**
     * 画布背景颜色
     */
    @observable backgroundColor: string = 'transparent'

    /**
     * 编辑区域宽度
     */
    @observable viewportWidth = 100

    /**
     * 编辑区域高度
     */
    @observable viewportHeight = 100

    /**
     * 网页适配 pc 还是 mobile
     */
    @observable fitInWeb = 'pc'

    /**
     * 外部传参
     */
    @observable externalParameter: Array<FitGaea.ExternalParameter> = []

    /**
     * 展示时间段
     */
    @observable showTimeStart: string = null
    @observable showTimeEnd: string = null
    showTimeStartDate = ''
    showTimeStartTime = ''
    showTimeEndDate = ''
    showTimeEndTime = ''
}