/**
 * 存储所有编辑状态视图区域的数据
 */
export default class ViewportStore {
    /**
     * 视图区域 dom
     */
    viewportDOM: HTMLElement = null
    /**
     * 根级实例的 key
     */
    rootInstanceKey: string = null
    /**
     * 当前所有组件实例
     */
    components = new Map<string, any>()
}