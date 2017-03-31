/**
 * Viewport's component instance info
 */
declare interface InstanceInfo {
    /**
     * Component information
     */
    info: ComponentProps
    /**
     * Children's instanceKey（only canDragIn）
     */
    layoutChilds?: Array<string>
    /**
     * Parent component's instanceKey
     * Root component's is null
     */
    parentInstanceKey: string
}