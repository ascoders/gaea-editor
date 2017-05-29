/**
 * Viewport's component instance info
 */
declare interface InstanceInfo {
    /**
     * Gaea key, use it can find componentClass, and access defaultProps.gaeaSetting
     */
    gaeaKey: string
    /**
     * 预设组件专有属性，实例化 componentClass 还是根据 gaeaKey 找，但是配置会优先根据 preGaeaKey 找
     */
    preGaeaKey?: string
    /**
     * Component data, all operate save here
     */
    data: {
        /**
         * Merge to props
         */
        props?: {
            [prop: string]: any
        }
        /**
         * Event data
         */
        events?: InstanceInfoEvent[]
    }
    /**
     * Children's instanceKey（only isContainer)
     * Component who's property isContainer is false will not have the property
     */
    childs?: string[]
    /**
     * Parent component's instanceKey
     * Root component's parentInstanceKey is null
     */
    parentInstanceKey: string
}

declare interface IDragInfo {
    /**
     * Drag from application menu or viewport or a combo component?
     */
    type: "new" | "viewport" | "combo"
    dragStartParentDom: HTMLElement
    dragStartIndex: number
    info: IDragInfoNew | IDragInfoViewport
}

declare interface IDragInfoNew {
    gaeaKey?: string
    /**
     * 预设 props
     */
    props?: any
    /**
     * 预设 gaeaKey
     */
    preGaeaKey?: string
    targetInstanceKey?: string
    targetIndex?: number
}

declare interface IDragInfoViewport {
    /**
     * Current drag instance key
     */
    instanceKey?: string
    /**
     * Drag target instance key
     */
    targetInstanceKey?: string
    /**
     * Index where drag to
     */
    targetIndex?: number
}

/**
 * full viewport information
 */
declare interface IFullInformation {
    [instanceKey: string]: InstanceInfo
}

declare interface InstanceInfoEvent {
    /**
     * 触发
     */
    trigger: InstanceInfoEventTrigger
    triggerData?: InstanceInfoEventTriggerDataCallback | InstanceInfoEventTriggerDataSubscribe | any
    /**
     * 动作
     */
    action: InstanceInfoEventAction
    actionData?: InstanceInfoEventTriggerActionEmit | any
}

declare type InstanceInfoEventTrigger = "init" | "callback" | "subscribe"

declare type InstanceInfoEventAction = "none" | "emit"

declare interface InstanceInfoEventTriggerDataCallback {
    // 触发回调的函数名，在 props 上
    // eg: onChange
    trigger: string
    triggerData: Array<{
        // 第 index 个回调参数名称
        name: string
    }>
}

declare interface InstanceInfoEventTriggerDataSubscribe {
    // 订阅名称
    name: string
}

declare interface InstanceInfoEventTriggerActionEmit {
    // 广播名称
    name: string
    // 广播参数
    data?: any
}
