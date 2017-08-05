import { inject } from "dependency-inject"
import { Action } from "dob"
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
    @Action public loadPluginByPosition(position: string, props?: any) {
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
    @Action public addComponentClass(componentClass: React.ComponentClass<IGaeaProps>) {
        const gaeaKey = componentClass.defaultProps.gaeaSetting.key
        this.store.componentClasses.set(gaeaKey, componentClass)

        // 添加这个组件的编辑配置
        this.setComponentSetting(gaeaKey, componentClass.defaultProps.gaeaSetting)

        // 添加这个组件的 defaultProps
        this.setComponentDefaultProps(gaeaKey, componentClass.defaultProps)
    }

    /**
     * 添加组件的配置信息
     */
    @Action public setComponentSetting(gaeaOrPreKey: string, setting: IGaeaSetting) {
        if (!this.store.componentSetting.has(gaeaOrPreKey)) {
            this.store.componentSetting.set(gaeaOrPreKey, setting)
        } else {
            const prevSetting = this.store.componentSetting.get(gaeaOrPreKey)
            Object.assign(prevSetting, setting)
        }
    }

    /**
     * 添加组件 defaultProps
     */
    @Action public setComponentDefaultProps(gaeaOrPreKey: string, defaultProps: IDefaultProps) {
        if (!this.store.componentDefaultProps.has(gaeaOrPreKey)) {
            this.store.componentDefaultProps.set(gaeaOrPreKey, defaultProps)
        } else {
            const prevDefaultProps = this.store.componentDefaultProps.get(gaeaOrPreKey)
            Object.assign(prevDefaultProps, defaultProps)
        }
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

        // 新创建的页面默认都在根节点
        this.store.rootPageKeys.push(pageKey)

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

        this.store.rootPageKeys.push(pageKey)

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
            const existIndex = parentPage.childs.findIndex(childKey => childKey === pageKey)
            parentPage.childs.splice(existIndex, 1)
        }

        // 如果是根节点，从根节点数组中删除
        if (!pageInfo.parentKey) {
            const existIndex = this.store.rootPageKeys.findIndex(rootPageKey => rootPageKey === pageKey)
            this.store.rootPageKeys.splice(existIndex, 1)
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
     * 修改 page 父级
     */
    @Action public changePageParentKey(pageKey: string, parentKey: string) {
        const pageInfo = this.store.pages.get(pageKey)

        // 存在父节点，说明不是根节点
        if (pageInfo.parentKey !== null) {
            const preParentInfo = this.store.pages.get(pageInfo.parentKey)
            const existIndex = preParentInfo.childs.findIndex(childKey => childKey === pageKey)
            preParentInfo.childs.splice(existIndex, 1)

            if (parentKey === null) {
                // 如果开始不在根节点，被设置到根节点，添加到数组中
                this.store.rootPageKeys.push(pageKey)
            }
        } else {
            // 如果开始在根节点，被设置到非根节点，从数组中移除
            if (parentKey !== null) {
                const existIndex = this.store.rootPageKeys.findIndex(rootPageKey => rootPageKey === pageKey)
                this.store.rootPageKeys.splice(existIndex, 1)
            }
        }

        pageInfo.parentKey = parentKey

        const nextParentInfo = this.store.pages.get(parentKey)
        nextParentInfo.childs.push(pageKey)
    }

    /**
     * 确认创建 page
     */
    @Action public confirmCreatePage() {
        // 把当前创建页面 key 删除，这个页面就不会随着关闭而消失，进而成功创建了页面
        this.store.currentCreatedPageKey = null
        this.store.currentEditPageKey = null
    }

    /**
     * 获取某个文件夹全部子元素数组
     */
    @Action public getPageAllChilds(pageKey: string) {
        const getAllChilds = (currentPageKey: string): string[] => {
            const currentPageInfo = this.store.pages.get(currentPageKey)
            if (currentPageInfo.type !== "folder") {
                return []
            }

            let childs = currentPageInfo.childs.slice()
            currentPageInfo.childs.forEach(eachChild => {
                childs = childs.concat(getAllChilds(eachChild))
            })

            return childs
        }

        return getAllChilds(pageKey)
    }

    /**
     * 更新当前 viewport 使用的页面
     */
    @Action public changeCurrentViewportPageKey(pageKey: string) {
        this.store.currentViewportPageKey = pageKey
    }

    /**
     * 初始化页面
     */
    @Action public initApplication(value: string) {
        const info: IAllInformation = JSON.parse(LZString.decompressFromBase64(value))
        this.store.rootPageKeys = info.rootPageKeys
        this.store.persistenceData = info.persistenceData || {}
        Object.keys(info.pages).forEach(pageKey => {
            this.store.pages.set(pageKey, info.pages[pageKey])
        })
        info.instancesArray.forEach(instanceInfo => {
            this.store.pageInstances.set(instanceInfo.pageKey, instanceInfo.instances)
        })

        let homePageKey: string = null
        this.store.pages.forEach((page, pageKey) => {
            if (page.isHomePage) {
                homePageKey = pageKey
            }
        })

        const homeInstances = this.store.pageInstances.get(homePageKey)
        Object.keys(homeInstances).forEach(instanceKey => {
            this.viewportStore.instances.set(instanceKey, homeInstances[instanceKey])

            if (homeInstances[instanceKey].parentInstanceKey === null) {
                this.viewportStore.rootInstanceKey = instanceKey
            }
        })

        // 将首页设置为当前编辑状态
        this.store.currentViewportPageKey = homePageKey
    }

    /**
     * 重置应用状态，将当前状态全部清空，适合做一些动作前清场
     */
    @Action public resetApplication() {
        this.store.isPreview = false
        this.store.isShowModal = false
        this.store.leftTool = null
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
                instances: { ...instances }
            })
        })

        return JSON.parse(JSON.stringify({
            pages,
            instancesArray,
            rootPageKeys: this.store.rootPageKeys,
            persistenceData: this.store.persistenceData
        }))
    }

    @Action public getFullInformationGzipped() {
        return LZString.compressToBase64(JSON.stringify(this.getAllInformation()))
    }

    /**
     * 设置预设组件
     */
    @Action public setPreComponent(gaeaKey: string, setting: IPreComponent) {
        if (!this.store.preComponents.has(gaeaKey)) {
            this.store.preComponents.set(gaeaKey, [setting])
        } else {
            const settings = this.store.preComponents.get(gaeaKey)
            settings.push(setting)
        }
    }

    /**
     * 根据 instanceKey 获取配置
     */
    @Action public getSettingByInstance(instance: InstanceInfo) {
        if (this.store.componentSetting.has(instance.preGaeaKey)) {
            return this.store.componentSetting.get(instance.preGaeaKey)
        } else {
            return this.store.componentSetting.get(instance.gaeaKey)
        }
    }

    /**
     * 根据 instanceKey 获取 defaultProps
     * 辅助方法，在编辑器中调用，因此没有使用 @Action, 为了数据追踪
     */
    public getDefaultPropsByInstance(instance: InstanceInfo) {
        if (this.store.componentDefaultProps.has(instance.preGaeaKey)) {
            return this.store.componentDefaultProps.get(instance.preGaeaKey)
        } else {
            return this.store.componentDefaultProps.get(instance.gaeaKey)
        }
    }

    /**
     * 设置持久化信息，这个信息在 onSave 会回调出去，是页面保存的信息
     */
    @Action public setPersistenceData(key: string, value: any) {
        this.store.persistenceData[key] = value
    }

    /**
     * 获取持久化信息
     */
    @Action public getPersistenceData(key: string) {
        return this.store.persistenceData[key]
    }

    @Action public setOnComponentDragStart(fn: any) {
        this.store.onComponentDragStart = fn
    }
}
