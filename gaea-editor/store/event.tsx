/**
 * 事件系统
 */

import Event from '../event-system/event-system'

export default class EventSystem extends Event {
    /**
     * 当视图或者树区域有组件 hover
     */
    viewportOrTreeComponentMouseOver = 'viewportOrTreeComponentMouseOver'

    /**
     * 当视图或者树区域根组件取消 hover
     */
    viewportOrTreeRootComponentMouseLeave = 'viewportOrTreeRootComponentMouseLeave'

    /**
     * 改变某个组件的选中状态
     */
    changeComponentSelectStatusEvent = 'changeComponentSelectStatus'

    /**
     * 触发了保存
     */
    onSave = 'onSave'

    /**
     * 触发了获取版本信息
     */
    onGetPublishList = 'onGetPublishList'

    /**
     * 预览了某个版本
     */
    onPreviewVersion = 'onPreviewVersion'

    /**
     * 触发了切换版本
     */
    onSwitchVersion = 'onSwitchVersion'

    /**
     * 触发了发布版本
     */
    onPublish = 'onPublish'
}