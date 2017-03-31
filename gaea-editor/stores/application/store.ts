export default class ApplicationStore {
    /**
     * Navbar height
     */
    navbarHeight = 40
    /**
     * Is in preview
     */
    isPreview = false
    /**
     * Viewport parent container's style
     */
    viewportContainerStyle = {}
    /**
     * Viewport style
     */
    viewportStyle = {}
    /**
     * All gaea plugins
     */
    plugins?: Plugin[] = []
    /**
     * All component's class
     * key: component's name
     * value: component's class
     */
    componentClasses = new Map<string, React.ComponentClass<ComponentProps>>()
    /**
     * Viewport's initialization data
     */
    defaultValue?: any = null
    /**
     * Viewport root component's name
     */
    rootComponentName = ''
}