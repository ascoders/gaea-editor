export default class ApplicationStore {
    /**
     * 导航条高度
     */
    navbarHeight = 40

    /**
     * 是否处于预览状态
     */
    isPreview = false

    /**
     * 实图外层容器样式
     */
    viewportContainerStyle = {}

    /**
     * 视图容器样式
     */
    viewportStyle = {}

    /**
     * 所有插件，包括内置与第三方
     */
    plugins?: Plugin[] = []

    /**
     * 所有组件类
     */
    componentClasses = new Map<string, React.ComponentClass<ComponentProps>>()

    /**
     * 页面初始化数据
     */
    defaultValue?: any = null
}