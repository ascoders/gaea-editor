/**
 * Plugin
 */
declare interface IPlugin {
    /**
     * Position insert to editor
     */
    position: string
    /**
     * React class
     */
    class: any
    /**
     * Plugin's action
     */
    actions?: {
        [name: string]: any
    }
    /**
     * Plugin's store
     */
    stores?: {
        [name: string]: any
    }
}

/**
 * Drag source's props should extends this interface
 */
declare interface IGaeaProps extends React.HTMLProps<any> {
    gaeaSetting: IGaeaSetting
}

declare interface IGaeaSetting {
    /**
     * Unique key
     */
    key: string
    /**
     * Custom show name
     */
    name: string
    /**
     * Edit infos
     */
    editors?: Array<string | IEditor>
    /**
     * Is in preview mode
     */
    isPreview?: boolean
    /**
     * Container can be dragged into component
     */
    isContainer?: boolean
    /**
     * 自定义事件
     * 组件设置的事件，只支持回调事件
     */
    events?: ISettingEvent[]
}

declare interface IDefaultProps {
    [key: string]: any
}

declare interface IEditor {
    /**
     * Which field to control?
     * EX. text, size, user.nickname
     */
    field: string
    /**
     * Which Editor want to show?
     * Basic type like `string` `number`, or custom editor like `layout`
     */
    type: string
    /**
     * Show label
     */
    label: string
    /**
     * 当类型为非普通类型时，允许添加额外配置
     * 当其为字符串时，对数组时，表示每一项都使用一种类型编辑
     * 当其为对象时，对数组时，表示每一项都是对象，再设定每个对象的编辑方式
     */
    editors?: IEditorOptionArray | string
    /**
     * 特殊类型的额外描述信息
     */
    data?: IEditorNumberData | any
}

declare type IEditorOptionArray = IEditor[]

declare interface IEditorNumberData {
    /**
     * 是否使用滑块
     */
    useSlider?: boolean
    /**
     * 滑块、输入框步长
     */
    step: number,
    /**
     * 输入范围
     */
    inputRange: number[],
    /**
     * 输出范围
     */
    outputRange: number[]
}

declare interface IPage {
    /**
     * Can create a folder or page
     */
    type: "page" | "folder"
    /**
     * Is home page
     */
    isHomePage?: boolean
    /**
     * description name
     */
    name: string
    /**
     * Real path
     */
    path: string
    parentKey: string
    /**
     * Only exist in folder
     */
    childs?: string[]
}

declare interface IPages {
    [pageKey: string]: IPage
}

declare type InstancesArray = Array<{
    /**
     * The page instances belong to
     */
    pageKey: string
    instances: {
        [instanceKey: string]: InstanceInfo
    }
}>

/**
 * Page store structor
 */
declare interface IAllInformation {
    /**
     * All page info
     */
    pages: IPages
    /**
     * Root page keys
     */
    rootPageKeys: string[]
    /**
     * All instance info
     */
    instancesArray: InstancesArray
    /**
     * 用户自定义数据
     */
    persistenceData?: {
        [x: string]: any
    }
}

declare interface IPreComponent {
    /**
     * gaea Key
     */
    key: string
    /**
     * Pre-setting props
     */
    props: any
}

declare interface ISettingEvent {
    /**
     * 名称
     */
    name?: string
    /**
     * 对应 props，在 callback 时主要使用
     */
    field?: string
    /**
     * 触发提供的参数
     */
    data?: Array<{
        // 第 index 个回调参数名称
        name: string
    }>
}

declare type IOnComponentDragStart = (gaeaKeyOrPreGaeaKey?: string) => Promise<IOnComponentDragStartReturn> | IOnComponentDragStartReturn

declare interface IOnComponentDragStartReturn {
    setting: any
    props: any
}
