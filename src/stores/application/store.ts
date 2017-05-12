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
    public leftTool: string | null = null
    public rightTool: string | null = null
    /**
     * Show modal?
     */
    public isShowModal = false
    public modalTitle = ""
    public modalContentRender: () => (React.ReactElement<any>) = null
}
