import { observable, Static } from "dob"

@observable
export default class ApplicationStore {
    /**
     * Navbar height
     */
    public navbarHeight = 40
    /**
     * Is in preview
     */
    public isPreview = false
    /**
     * Viewport parent container's style
     */
    public viewportContainerStyle = {}
    /**
     * Viewport style
     */
    public viewportStyle = {}
    /**
     * All gaea plugins
     */
    public plugins?: IPlugin[] = []
    /**
     * All component's class
     * key: component's name
     * value: component's class
     */
    public componentClasses = new Map<string, React.ComponentClass<IGaeaProps>>()
    /**
     * 所有组件的编辑属性 GaeaProps
     * key: gaeaKey | preGaeaKey
     */
    public componentSetting = new Map<string, IGaeaSetting>()
    /**
     * 所有组件 defaultProps
     * key: gaeaKey | preGaeaKey
     */
    public componentDefaultProps = new Map<string, IDefaultProps>()
    /**
     * Viewport's initialization data
     */
    public defaultValue?: any = null
    /**
     * Viewport root component's name
     */
    public rootComponentName = ""
    /**
     * left tool name
     */
    public leftTool: string = null
    public rightTool: string = null
    /**
     * Show modal?
     */
    public isShowModal = false
    public modalTitle = ""
    public modalContentRender: (closeModal?: () => void) => (React.ReactElement<any>) = null
    /**
     * page instances
     */
    public pages = new Map<string, IPage>()
    /**
     * Current create page key
     */
    public currentCreatedPageKey: string = null
    /**
     * Current edit page key
     */
    public currentEditPageKey: string = null
    /**
     * Current edit page real path
     */
    public get currentEditPageRealPath() {
        if (!this.currentEditPageKey) {
            return null
        }

        const pageInfo = this.pages.get(this.currentEditPageKey)

        if (pageInfo.type !== "page") {
            return null
        }

        let realPath = pageInfo.path

        let tempPageInfo = pageInfo
        while (tempPageInfo.parentKey !== null) {
            const parentPageInfo = this.pages.get(tempPageInfo.parentKey)
            realPath = parentPageInfo.path + "/" + realPath
            tempPageInfo = parentPageInfo
        }

        return realPath
    }
    /**
     * Current edit page
     */
    public get currentEditPage() {
        return this.pages.get(this.currentEditPageKey)
    }
    /**
     * The page key used by viewport at present
     */
    public currentViewportPageKey: string = null
    /**
     * Static save instance per page
     */
    public pageInstances = Static(new Map<string, IFullInformation>())
    /**
     * 根结点 pagekeys，因为树状图没有根节点，又要保证顺序，故存储根节点数组
     */
    public rootPageKeys: string[] = []
    /**
     * Page folder list
     */
    public get pageFolderList() {
        return Array.from(this.pages).filter(([pageKey, pageInfo], index) => {
            return pageInfo.type === "folder"
        }).map(([pageKey, pageInfo], index) => {
            return pageKey
        })
    }
    /**
     * 预设组件
     * 将一个组件加入此配置，这个组件会从组件列表中移除，并根据配置的 props 信息展示为 N 个独立组件
     * 在显示时，这个组件与普通组件别无二致，只是会加上默认配置，并且这个配置可以不在[可编辑配置中]
     * key: gaeaKey
     */
    public preComponents = new Map<string, IPreComponent[]>()

    /**
     * 页面持久化数据
     */
    public persistenceData?: {
        [x: string]: any
    } = Static({})

    /**
     * GaeaEditor props: onComponentDragStart
     */
    public onComponentDragStart: IOnComponentDragStart = Static(() => null as any)
}
