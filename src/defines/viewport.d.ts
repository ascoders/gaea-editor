/**
 * Viewport's component instance info
 */
declare interface InstanceInfo {
    /**
     * Component information
     */
    info: GaeaSetting
    /**
     * Children's instanceKey（only canDragIn）
     */
    childs?: Array<string>
    /**
     * Parent component's instanceKey
     * Root component's parentInstanceKey is null
     */
    parentInstanceKey: string
}