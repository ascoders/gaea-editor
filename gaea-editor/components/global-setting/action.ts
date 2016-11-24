import {
    action,
    extendObservable,
    observable,
    ApplicationAction,
    inject
} from '../../../gaea-editor-manager/gaea-editor-manager'
import * as LZString from 'lz-string'

import GlobalSettingStore from './store'

export default class GlobalSettingAction {
    @inject('GlobalSettingStore') private globalSetting: GlobalSettingStore
    @inject('ApplicationAction') private applicationAction: ApplicationAction

    @observable observableClass = true

    @action('获取压缩的配置信息') getZipSettingData() {
        return LZString.compressToBase64(JSON.stringify(this.globalSetting))
    }

    @action('覆盖默认配置信息') setDefaultSetting(setting: string) {
        if (setting !== null && setting !== undefined && setting !== '') {
            this.globalSetting = extendObservable(this.globalSetting || {}, JSON.parse(LZString.decompressFromBase64(setting)))
        }
    }

    @action('设置是否显示布局元素') setShowLayout(isShow: boolean) {
        this.globalSetting.showLayout = isShow
    }

    @action('设置点击编辑框移除按钮时, 是否二次确认') setConfirmWhenRemoveComponent(isConfirm: boolean) {
        this.globalSetting.confirmWhenRemoveComponent = isConfirm
    }

    @action('设置画布背景颜色') setBackgroundColor(color: string, opacity: number) {
        // 如果透明度是 0，换成 transparent
        if (opacity === 0) {
            this.applicationAction.setViewportContainerStyle({
                backgroundColor: `transparent`
            })
            this.globalSetting.backgroundColor = `transparent`
        } else {
            this.applicationAction.setViewportContainerStyle({
                backgroundColor: color
            })
            this.globalSetting.backgroundColor = color
        }
    }

    @action('设置视图区域宽度') setViewportSize(width: number, height: number) {
        this.globalSetting.viewportWidth = width
        this.globalSetting.viewportHeight = height
        this.applicationAction.setViewportStyle({
            width: this.globalSetting.viewportWidth,
            height: this.globalSetting.viewportHeight
        })
    }

    @action('修改网页适配') changeFitInWeb(type: string) {
        this.globalSetting.fitInWeb = type
        if (type === 'pc') {
            // 适配网页
            this.applicationAction.setViewportStyle({
                width: null,
                height: null,
                flexGrow: 1
            })
        } else {
            // 适配手机
            this.applicationAction.setViewportStyle({
                flexGrow: null,
                width: this.globalSetting.viewportWidth,
                height: this.globalSetting.viewportHeight
            })
        }
    }
}