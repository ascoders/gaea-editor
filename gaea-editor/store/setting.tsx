/**
 * 设置
 */

import {observable, computed, map, transaction, action} from 'mobx'

export default class Setting {
    /**
     * 点击编辑框移除按钮时, 是否二次确认
     */
    @observable confirmWhenRemoveComponent: boolean = true

    /**
     * 拖动时显示所有布局元素
     */
    @observable showLayout: boolean = true

    @action('设置是否显示布局元素') setShowLayout(isShow: boolean) {
        this.showLayout = isShow
    }

    @action('设置点击编辑框移除按钮时, 是否二次确认') setConfirmWhenRemoveComponent(isConfirm: boolean) {
        this.confirmWhenRemoveComponent = isConfirm
    }
}