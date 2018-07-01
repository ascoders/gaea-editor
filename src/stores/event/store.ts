/**
 * 存储所有事件
 */
export default class ViewportStore {
  /**
   * 鼠标离开视图区域
   */
  public mouseLeaveViewport = 'mouseLeaveViewport';

  /**
   * 鼠标移动到某个组件上
   */
  public mouseHoveringComponent = 'mouseHoveringComponent';

  /**
   * 视图区域发生更新
   */
  public viewportUpdated = 'viewportUpdated';

  /**
   * 刷新某个实例
   */
  public instanceUpdate = 'instanceUpdate';

  /**
   * 页面重渲染
   */
  public refreshPage = 'refreshPage';

  /**
   * 触发编辑器回调
   */
  public emitEditorCallback = 'emitEditorCallback';
}
