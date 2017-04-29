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
    public components = new Map<string, any>()
}
