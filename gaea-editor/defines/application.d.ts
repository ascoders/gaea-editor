/**
 * 插件
 */
declare interface Plugin {
    /**
     * 插入的位置
     */
    position: string
    /**
     * 插件组件 class
     */
    component: any
    /**
     * 插件 action
     */
    actions?: any
    /**
     * 插件 store
     */
    stores?: any
}