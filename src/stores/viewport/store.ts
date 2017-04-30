/**
 * 存储所有编辑状态视图区域的数据
 */
export default class ViewportStore {
    /**
     * 视图区域 dom
     */
    public viewportDOM: HTMLElement = null
    /**
     * 根级实例的 key
     */
    public rootInstanceKey: string = null
    /**
     * 当前所有组件实例
     */
    public instances = new Map<string, InstanceInfo>()
    /**
     * 组件实例到dom节点的映射
     */
    public instanceDoms = new Map<string, HTMLElement>()
    /**
     * current drag info
     */
    public currentDragInfo: IDragInfo = null
    public currentHoverInstanceKey: string
    public currentEditInstanceKey: string
}
