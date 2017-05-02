/**
 * 存储所有事件
 */
export default class ViewportStore {
  // 鼠标离开视图区域
  public mouseLeaveViewport = "mouseLeaveViewport"

  // 鼠标移动到某个组件上
  public mouseHoveringComponent = "mouseHoveringComponent"

  // 视图区域发生更新
  public viewportUpdated = "viewportUpdated"

  // 某个视图中元素 dom 位置发生了变化
  public viewportDomUpdate = "viewportDomUpdate"

  // 页面冲渲染
  public refreshPage = "refreshPage"
}
