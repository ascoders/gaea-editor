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
     * 插件
     */
    plugins?: Plugin[] = []

    /**
     * 页面初始化数据
     */
    defaultValue?: any = null
}