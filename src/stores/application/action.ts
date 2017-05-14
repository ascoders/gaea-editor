import { inject } from "dependency-inject"
import { Action } from "dynamic-object"
import * as _ from "lodash"
import * as LZString from "lz-string"
import * as React from "react"
import ViewportStore from "../viewport/store"
import ApplicationStore from "./store"

export default class ApplicationAction {
    @inject(ApplicationStore)
    private store: ApplicationStore

    @inject(ViewportStore)
    private viewportStore: ViewportStore
    /**
     * 添加插件
     */
    @Action public addPlugin(plugin: IPlugin) {
        this.store.plugins.push(plugin)
    }

    /**
     * position 根据位置加载插件
     */
    @Action public loadingPluginByPosition(position: string, props?: any) {
        return this.store.plugins
            .filter((plugin) => plugin.position === position)
            .map((plugin, index) => {
                return React.createElement(plugin.class, {
                    key: index,
                    ...props
                })
            })
    }

    /**
     * add component class
     */
    @Action public addComponentClass(componentClass: any) {
        this.store.componentClasses.set(componentClass.defaultProps.gaeaSetting.key, componentClass)
    }

    /**
     * get component class by gaeaKey
     */
    @Action public getComponentClassByKey(gaeaKey: string) {
        return this.store.componentClasses.get(gaeaKey)
    }

    /**
     * set preview
     */
    @Action public setPreview(isPreview: boolean) {
        this.store.isPreview = isPreview
    }

    @Action public setLeftTool(name: string | null) {
        this.store.leftTool = name
    }

    @Action public setRightTool(name: string | null) {
        this.store.rightTool = name
    }

    /**
     * 弹出模态框
     */
    @Action public createModal(config: { title: string }, renderContent: () => React.ReactElement<any>) {
        this.store.modalTitle = config.title
        this.store.modalContentRender = renderContent
        this.store.isShowModal = true
    }

    /**
     * 关闭模态框
     */
    @Action public closeModal() {
        this.store.isShowModal = false
        this.store.modalTitle = null
        this.store.modalContentRender = null
    }

    /**
     * 渲染模态框内容
     */
    @Action public renderModalContent() {
        if (typeof this.store.modalContentRender === "function") {
            return this.store.modalContentRender(this.closeModal)
        } else {
            return null
        }
    }

    /**
     * 生成唯一的 page key
     */
    @Action public createNewPageKey() {
        return _.uniqueId("gaea_page_")
    }

    /**
     * 创建 page
     */
    @Action public createNewPage(isFolder: boolean) {
        const pageKey = this.createNewPageKey()
        this.store.currentCreatedPageKey = pageKey
        this.store.currentEditPageKey = pageKey
        if (isFolder) {
            this.store.pages.set(pageKey, {
                type: "folder",
                name: "",
                path: "",
                parentKey: null,
                childs: []
            })
        } else {
            this.store.pages.set(pageKey, {
                type: "page",
                name: "",
                path: "",
                parentKey: null
            })
        }
        return pageKey
    }

    /**
     * 创建首页
     */
    @Action public createHomePage() {
        const pageKey = this.createNewPageKey()
        this.store.pages.set(pageKey, {
            type: "page",
            name: "首页",
            path: "",
            parentKey: null,
            isHomePage: true
        })
        return pageKey
    }

    /**
     * 设置当前编辑页面
     */
    @Action public setCurrentEditPageKey(pageKey: string) {
        this.store.currentEditPageKey = pageKey
    }

    /**
     * 删除当前创建中的 page
     */
    @Action public RemoveCreatingPage() {
        if (this.store.currentCreatedPageKey !== null) {
            this.removePage(this.store.currentCreatedPageKey)
        }
        this.store.currentCreatedPageKey = null
        this.store.currentEditPageKey = null
    }

    /**
     * 删除 page
     */
    @Action public removePage(pageKey: string) {
        const pageInfo = this.store.pages.get(pageKey)

        // 先从父级元素删除此 pageKey
        if (pageInfo.parentKey !== null) {
            const parentPage = this.store.pages.get(pageInfo.parentKey)
        }

        this.store.pages.delete(pageKey)
    }

    /**
     * 修改 page 名称
     */
    @Action public changePageName(pageKey: string, pageName: string) {
        const pageInfo = this.store.pages.get(pageKey)
        pageInfo.name = pageName
    }

    /**
     * 修改 page 路径
     */
    @Action public changePagePath(pageKey: string, pagePath: string) {
        const pageInfo = this.store.pages.get(pageKey)
        pageInfo.path = pagePath
    }

    /**
     * 确认创建 page
     */
    @Action public confirmCreatePage() {
        // 把当前创建页面 key 删除，这个页面就不会随着关闭而消失，进而成功创建了页面
        this.store.currentCreatedPageKey = null
    }

    /**
     * 更新当前 viewport 使用的页面
     */
    @Action public changeCurrentViewportPageKey(pageKey: string) {
        this.store.currentViewportPageKey = pageKey
    }

    /**
     * 初始化应用状态
     */
    @Action public resetApplication() {
        this.store.isPreview = false
        this.store.isShowModal = false
        this.store.rightTool = null
        this.store.currentCreatedPageKey = null
        this.store.currentEditPageKey = null
    }

    /**
     * 获得应用全部信息
     */
    @Action public getAllInformation(): IAllInformation {
        // 把当前  viewport 信息保存到 page 中
        const fullInformation = this.viewportStore.currentFullInformation
        this.store.pageInstances.set(this.store.currentViewportPageKey, fullInformation)

        const pages: IPages = {}
        this.store.pages.forEach((pageInfo, pageKey) => {
            pages[pageKey] = pageInfo
        })

        const instancesArray: InstancesArray = []

        Array.from(this.store.pageInstances).forEach(([pageKey, instances], index) => {
            instancesArray.push({
                pageKey,
                instances: Object.assign({}, instances)
            })
        })

        return {
            pages,
            instancesArray
        }
    }

    @Action public getFullInformationGzipped() {
        return LZString.compressToBase64(JSON.stringify(this.getAllInformation()))
    }
}
