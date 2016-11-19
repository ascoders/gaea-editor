import {observable} from 'mobx'

export default class EventStore {
    // 鼠标离开视图区域
    @observable mouseLeaveViewport = 'mouseLeaveViewport'

    // 鼠标移动到某个组件上
    @observable mouseHoveringComponent = 'mouseHoveringComponent'

    // 视图区域发生更新
    @observable viewportUpdated = 'viewportUpdated'

    // 某个视图中元素 dom 位置发生了变化
    @observable viewportDomUpdate = 'viewportDomUpdate'
}