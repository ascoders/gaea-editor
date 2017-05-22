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
    editor?: Array<string | IEditor>
    /**
     * Is in preview mode
     */
    isPreview?: boolean
    /**
     * Container can be dragged into component
     */
    isContainer?: boolean
    /**
     * 配置信息是否在获取中
     */
    isLoading?: boolean
    /**
     * 组件被点击时触发
     */
    onClick?: (info?: InstanceInfo) => void
}

declare interface IEditor {
    /**
     * Which field to control?
     * EX. text, size, user.nickname
     */
    field: string
    /**
     * Which Editor want to show?
     * Basic type like `text` `number`, or custom editor like `layout`
     */
    type: string
    /**
     * Show label
     */
    label: string
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
