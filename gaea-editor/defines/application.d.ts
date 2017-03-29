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

/**
 * 可供拖拽组件 props，需满足定义
 */
declare interface ComponentProps extends React.HTMLProps<any> {
    /**
     * 唯一的 key,用来唯一标识这个组件,所有盖亚内部组件都以 gaea- 为前缀
     */
    gaeaUniqueKey: string
    /**
     * 组件的中文名
     */
    gaeaName: string
    /**
     * 组件图标,为 fontAwesome
     */
    gaeaIcon?: string
    /**
     * 编辑信息
     */
    gaeaEdit?: Array<any>
    /**
     * 事件定义
     */
    gaeaEvent?: any
    /**
     * 是否在预览模式，preivew 会传入 true
     */
    gaeaPreview?: boolean
    /**
     * 是否可以拖入子元素
     */
    canDragIn?: boolean
    /**
     * 存储事件设置
     */
    gaeaEventData?: Array<any>
    /**
     * 存储native事件设置
     */
    gaeaNativeEventData?: Array<any>
    /**
     * 存储变量信息
     */
    gaeaVariables?: {
        [field: string]: any
    }
    /**
     * 父组件传递的数据
     */
    gaeaData?: any

    /**
     * 渲染编辑回调
     */
    // renderEditer?:(React.ComponentClass<FitGaea.ComponentProps>,{})=>void

    [x: string]: any
}