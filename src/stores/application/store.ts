import { Static } from "dynamic-object"

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
}
