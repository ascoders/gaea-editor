/**
 * 设置
 */

import {observable, computed, map, transaction} from 'mobx'

export default class Setting {
    /**
     * 点击编辑框移除按钮时, 是否二次确认
     */
    @observable confirmWhenRemoveComponent: boolean = true

    setConfirmWhenRemoveComponent(isConfirm: boolean) {
        this.confirmWhenRemoveComponent = isConfirm
    }

    /**
     * 拖动时显示所有布局元素
     */
    @observable showLayoutWhenDragging: boolean = true

    setShowLayoutWhenDragging(isShow: boolean) {
        this.showLayoutWhenDragging = isShow
    }
}