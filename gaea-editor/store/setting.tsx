/**
 * 设置
 */

import {observable, computed, map, transaction, action, extendObservable} from 'mobx'
import * as LZString from 'lz-string'

export class SettingStore {
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
     * 用户自己配置的全局变量
     */
    @observable globalParams: Array<FitGaea.GlobalParam> = []
}

export default class Setting {
    data = new SettingStore()

    @action('获取压缩的配置信息') getZipSettingData() {
        return LZString.compressToBase64(JSON.stringify(this.data))
    }

    @action('覆盖默认配置信息') setDefaultSetting(setting: string) {
        if (setting !== null && setting !== undefined && setting !== '') {
            this.data = extendObservable(this.data || {}, JSON.parse(LZString.decompressFromBase64(setting)))
        }
    }

    @action('设置是否显示布局元素') setShowLayout(isShow: boolean) {
        this.data.showLayout = isShow
    }

    @action('设置点击编辑框移除按钮时, 是否二次确认') setConfirmWhenRemoveComponent(isConfirm: boolean) {
        this.data.confirmWhenRemoveComponent = isConfirm
    }

    @action('设置画布背景颜色') setBackgroundColor(color: string, opacity: number) {
        // 如果透明度是 0，换成 transparent
        if (opacity === 0) {
            this.data.backgroundColor = 'transparent'
        } else {
            this.data.backgroundColor = color
        }
    }

    @action('设置视图区域宽度') setViewportSize(width: number, height: number) {
        this.data.viewportWidth = width
        this.data.viewportHeight = height
    }

    @action('修改网页适配') changeFitInWeb(type: string) {
        this.data.fitInWeb = type
    }

    @action('增加全局变量配置') addGlobalParam(globalParam: FitGaea.GlobalParam) {
        this.data.globalParams.push(globalParam)
    }

    @action('删除全局变量配置') removeGlobalParam(index: number) {
        this.data.globalParams.splice(index, 1)
    }
}