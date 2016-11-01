/**
 * 编辑可视区域
 */

import {observable, computed, map, transaction, ObservableMap, extendObservable, action} from 'mobx'
import * as _ from 'lodash'
import Application from './application'
import * as LZString from 'lz-string'

export default class Viewport {
    private application: Application

    constructor(application: Application) {
        this.application = application
    }

    /**
     * 已实例化在编辑区域组件的集合
     */
    @observable components: ObservableMap<FitGaea.ViewportComponentInfo> = map<FitGaea.ViewportComponentInfo>()

    /**
     * 根节点的唯一 id
     */
    @observable rootMapUniqueKey: string

    /**
     * 生成根节点唯一 id
     */
    createRootUniqueId() {
        this.rootMapUniqueKey = this.createUniqueId()
        return this.rootMapUniqueKey
    }

    /**
     * 设置根节点唯一 id
     */
    setRootUniqueId(uniqueId: string) {
        this.rootMapUniqueKey = uniqueId
    }

    /**
     * 添加一个新实例元素收敛入口
     */
    setComponents(mapUniqueKey: string, componentInfo: FitGaea.ViewportComponentInfo) {
        componentInfo.props = this.completionEditProps(componentInfo.props)

        if (componentInfo.parentMapUniqueKey === null) {
            // 最外层必须相对定位，不能修改
            componentInfo.props.gaeaEdit = componentInfo.props.gaeaEdit.filter((edit: any)=>edit.editor !== 'position' && edit !== '定位')
        }

        this.components.set(mapUniqueKey, componentInfo)
    }

    /**
     * 补全编辑状态的配置 会修改原对象
     */
    completionEditProps(componentProps: FitGaea.ComponentProps) {
        if (!componentProps.gaeaEventData) {
            componentProps.gaeaEventData = observable([])
        }
        if (!componentProps.gaeaNativeEventData) {
            componentProps.gaeaNativeEventData = observable([])
        }
        if (!componentProps.gaeaVariables) {
            componentProps.gaeaVariables = observable([])
        }
        return componentProps
    }

    /**
     * 生成一个唯一
     */
    createUniqueId() {
        return _.uniqueId('gaea-component-' + new Date().getTime() + '-')
    }

    /**
     * 将某个元素重置为默认配置
     */
    resetComponent(mapUniqueKey: string) {
        const component = this.components.get(mapUniqueKey)
        // 找到对应 class
        const ComponentClass = this.application.getComponentByUniqueKey(component.props.gaeaUniqueKey)

        // 保存操作
        this.saveOperate({
            type: 'reset',
            mapUniqueKey: mapUniqueKey,
            reset: {
                beforeProps: JSON.parse(JSON.stringify(component.props)),
                beforeName: component.props.name
            }
        })

        // 保存事件设置
        const event = JSON.parse(JSON.stringify(component.props.gaeaEvent))

        // 开始重置
        transaction(()=> {
            component.props = extendObservable({}, _.cloneDeep(ComponentClass.defaultProps))
            // 还原事件，因为重置基础设置，不重置其它属性
            component.props.gaeaEvent = extendObservable({}, event)
        })
    }

    /**
     * 添加 component, 根据情况分为新添加、移动已存在组件
     */
    addComponent(parentMapUniqueKey: string, index: number) {
        // 对组合特殊处理
        if (this.currentMovingComponent.uniqueKey === 'combo') {
            // 返回组合的 copy
            const copyCombo = this.createCopyComponentWithNewUniqueKey(this.application.comboComponents[this.dragStartIndex], parentMapUniqueKey)
            this.addComplexComponent(parentMapUniqueKey, copyCombo.mapUniqueKey, index, copyCombo)
            return {
                mapUniqueKey: copyCombo.mapUniqueKey,
                component: copyCombo
            }
        } else if (this.currentMovingComponent.uniqueKey === 'source') {
            const copySource = this.createCopyComponentWithNewUniqueKey(JSON.parse(LZString.decompressFromBase64(this.currentMovingComponent.source)) as FitGaea.ViewportComponentFullInfo, parentMapUniqueKey)
            this.addComplexComponent(parentMapUniqueKey, copySource.mapUniqueKey, index, copySource)
            return {
                mapUniqueKey: copySource.mapUniqueKey,
                component: copySource
            }
        } else {
            let mapUniqueKey: string

            if (this.currentMovingComponent.isNew) {
                // 添加一个全新的 component
                mapUniqueKey = this.createUniqueId()

                // 是从预在 viewport 里配置好的地方创建新组件
                this.addNewComponent(mapUniqueKey, parentMapUniqueKey, this.currentMovingComponent.uniqueKey, index)
            } else {
                // 添加一个已存在的 component
                mapUniqueKey = this.currentMovingComponent.mapUniqueKey
                this.addToParent(mapUniqueKey, parentMapUniqueKey, index)
            }

            return {
                mapUniqueKey: mapUniqueKey,
                component: null
            }
        }
    }

    /**
     * 同一个父级下子元素移动位置
     */
    sortComponents(parentMapUniqueKey: string, beforeIndex: number, afterIndex: number) {
        const layoutChilds = this.components.get(parentMapUniqueKey).layoutChilds
        if (beforeIndex < afterIndex) {
            // 从左到右
            transaction(()=> {
                for (let index = beforeIndex; index < afterIndex; index++) {
                    const beforeUniqueKey = layoutChilds[index]
                    const afterUniqueKey = layoutChilds[index + 1]
                    layoutChilds[index] = afterUniqueKey
                    layoutChilds[index + 1] = beforeUniqueKey
                }
            })
        } else {
            // 从右到左
            transaction(()=> {
                for (let index = beforeIndex; index > afterIndex; index--) {
                    const beforeUniqueKey = layoutChilds[index]
                    const afterUniqueKey = layoutChilds[index - 1]
                    layoutChilds[index] = afterUniqueKey
                    layoutChilds[index - 1] = beforeUniqueKey
                }
            })
        }
    }

    /**
     * 当前是否在移动元素
     */
    @observable isMovingComponent = false

    /**
     * 开始拖拽
     * source 如果不为空，说明是灵活配置，直接将 source 生成到页面中
     */
    startDragging(childMapUniqueKey: string, uniqueKey: string, isNew: boolean, dragStartParentElement: Element = null, dragStartIndex = 0, source = '') {
        this.isMovingComponent = true
        this.dragStartParentElement = dragStartParentElement
        this.dragStartIndex = dragStartIndex
        this.currentMovingComponent = {
            mapUniqueKey: childMapUniqueKey,
            // 组件的唯一标识
            uniqueKey,
            isNew,
            source
        }
    }

    /**
     * 结束拖拽
     */
    endDragging() {
        this.isMovingComponent = false
    }

    @action('设置是否在拖拽中') setIsMovingComponent(isMoving: boolean) {
        this.isMovingComponent = isMoving
    }

    /**
     * 是否显示布局元素轮廓
     */
    @observable showLayoutBorder = false

    setShowLayoutBorder(isShow: boolean) {
        this.showLayoutBorder = isShow
    }

    /**
     * 当前正在移动元素的信息
     */
    currentMovingComponent: FitGaea.MovingComponent

    /**
     * 当前 viewport 正在 hover 的元素, 在 viewport 上的 x, y, width, height
     * 位置相对于 viewport
     */
    @observable viewportHoverComponentSpec: FitGaea.HoverComponentSpec = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        hovering: false
    }

    /**
     * 当前 tree 正在 hover 的元素, 在 viewport 上的 x, y, width, height
     * 位置相对于 tree
     */
    @observable treeHoverComponentSpec: FitGaea.HoverComponentSpec = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        hovering: false
    }

    /**
     * 拖拽开始时的父级元素 element
     */
    dragStartParentElement: Element = null

    /**
     * 拖拽开始时, 元素的位置
     */
    dragStartIndex: number = 0

    /**
     * gaea 编辑器跟元素 dom 对象
     */
    rootDomInstance: Element

    /**
     * 设置根 dom 元素
     */
    setRootDomInstance(rootDomInstance: Element) {
        this.rootDomInstance = rootDomInstance
    }

    /**
     * viewport dom 元素
     */
    viewportDomInstance: Element

    /**
     * 设置 viewport dom 元素
     */
    setViewportDomInstance(viewportDomInstance: Element) {
        this.viewportDomInstance = viewportDomInstance
    }

    /**
     * section-container dom 元素
     */
    sectionContainerDomInstance: Element

    /**
     * 设置 section-container dom 元素
     */
    setSectionContainerDomInstance(sectionContainerDomInstance: Element) {
        this.sectionContainerDomInstance = sectionContainerDomInstance
    }

    /**
     * 临时存储当前 hover 元素的 element
     */
    currentHoverElement: Element = null

    /**
     * 设置某个元素为 hover 元素
     */
    setHoverComponent(element: Element) {
        this.currentHoverElement = element
        this.resetComponentOutline()
    }

    /**
     * 校准当前 hover 元素边框虚线的位置
     */
    resetComponentOutline() {
        if (this.currentHoverElement === null) {
            return
        }

        // 找到这个元素的 left, top
        const targetBoundingClientRect = this.currentHoverElement.getBoundingClientRect()
        const viewportBoundingClientRect = this.viewportDomInstance.getBoundingClientRect()
        transaction(()=> {
            this.viewportHoverComponentSpec = {
                left: targetBoundingClientRect.left - viewportBoundingClientRect.left,
                top: targetBoundingClientRect.top - viewportBoundingClientRect.top,
                width: targetBoundingClientRect.width,
                height: targetBoundingClientRect.height,
                hovering: true
            }
        })
    }

    /**
     * 设置脱离 hover 状态
     */
    setLeaveHover() {
        this.viewportHoverComponentSpec.hovering = false
        this.currentHoverElement = null
    }

    /**
     * 设置 tree 脱离 hover 状态
     */
    setTreeLeaveHover() {
        this.treeHoverComponentSpec.hovering = false
    }

    /**
     * 树组件的根元素
     */
    treeDomInstance: Element

    /**
     * 设置树组件跟元素
     */
    setTreeDomInstance(treeDomInstance: Element) {
        this.treeDomInstance = treeDomInstance
    }

    /**
     * 设置某个树元素为 hover 元素
     */
    setHoverTreeComponent(element: Element) {
        // 找到这个元素的 left, top
        const targetBoundingClientRect = element.getBoundingClientRect()
        const treeBoundingClientRect = this.treeDomInstance.getBoundingClientRect()
        transaction(()=> {
            this.treeHoverComponentSpec = {
                left: targetBoundingClientRect.left - treeBoundingClientRect.left,
                top: targetBoundingClientRect.top - treeBoundingClientRect.top,
                width: element.clientWidth,
                height: element.clientHeight,
                hovering: true
            }
        })
    }

    /**
     * 当前编辑组件的 mapUniqueKey
     */
    @observable currentEditComponentMapUniqueKey: string = null

    /**
     * 设置当前编辑组件
     */
    setCurrentEditComponentMapUniqueKey(mapUniqueKey: string) {
        this.currentEditComponentMapUniqueKey = mapUniqueKey
        // 出现附加工具条，因为编辑框在这里
        this.showSidebarAddon()
    }

    /**
     * 取消编辑当前组件
     */
    cancelEditComponent() {
        this.hideSidebarAddon()
        if (this.currentEditPropsIndex !== null && this.currentEditPropsIndex !== undefined) {
            // 取消 事件-修改编属性
            this.setCurrentEditPropsIndex(null)
        }

        // 当前编辑字段清空
        this.currentEditComponentMapUniqueKey = null

        if (this.lastSelectMapUniqueKey !== null) {
            this.application.event.emit(this.application.event.changeComponentSelectStatusEvent, {
                mapUniqueKey: this.lastSelectMapUniqueKey,
                selected: false
            } as FitGaea.ComponentSelectStatusEvent)

            this.setLastSelectMapUniqueKey(null)
        }
    }

    /**
     * 根据子元素的 mapUniqueKey 寻找从跟元素开始的路径
     * 因为渲染的时候是嵌套渲染的, 从打平 map 中找到关系路径, 便于元素直接搜索任意子组件
     */
    findComponentPathFromRoot(mapUniqueKey: string) {
        let finderPath: Array<string> = [mapUniqueKey]

        let nowComponent = this.components.get(mapUniqueKey)

        // 如果已经是根元素, 直接返回空数组
        if (nowComponent.parentMapUniqueKey === null) {
            return [] as Array<string>
        }

        // 直到父级是根元素为止
        while (this.components.get(nowComponent.parentMapUniqueKey).parentMapUniqueKey !== null) {
            finderPath.unshift(nowComponent.parentMapUniqueKey)
            nowComponent = this.components.get(nowComponent.parentMapUniqueKey)
        }

        return finderPath
    }

    /**
     * 根据 editOptions 更新组件某个值
     */
    updateComponentOptionsValue(editOptions: FitGaea.ComponentPropsGaeaEdit, value: FitGaea.ComponentPropsOptionValue) {
        let componentInfo = this.components.get(this.currentEditComponentMapUniqueKey)

        const oldValue = JSON.parse(JSON.stringify(componentInfo.props))

        this.updateComponentOptionsValueByOptions(this.currentEditComponentMapUniqueKey, editOptions, value)

        const newValue = JSON.parse(JSON.stringify(componentInfo.props))

        // 保存操作
        this.saveOperate({
            type: 'update',
            mapUniqueKey: this.currentEditComponentMapUniqueKey,
            update: {
                oldValue,
                newValue
            }
        })
    }

    /**
     * 直接更新组件某个值
     */
    updateComponentValue(field: string, value: FitGaea.ComponentPropsOptionValue) {
        let componentInfo = this.components.get(this.currentEditComponentMapUniqueKey)
        const oldValue = JSON.parse(JSON.stringify(componentInfo.props))

        this.setPropsByField(componentInfo.props, field, value)

        const newValue = JSON.parse(JSON.stringify(componentInfo.props))

        // 保存操作
        this.saveOperate({
            type: 'update',
            mapUniqueKey: this.currentEditComponentMapUniqueKey,
            update: {
                oldValue,
                newValue
            }
        })
    }

    /**
     * 开始准备记录历史，如果更新 props 的话
     */
    prepareWriteHistory(mapUniqueKey?: string) {
        let componentInfo = this.components.get(mapUniqueKey || this.currentEditComponentMapUniqueKey)
        // 存储旧的值
        this.oldProps = JSON.parse(JSON.stringify(componentInfo.props))
    }

    /**
     * 记录一下历史
     */
    writeHistory(mapUniqueKey?: string) {
        let componentInfo = this.components.get(mapUniqueKey || this.currentEditComponentMapUniqueKey)
        const newValue = JSON.parse(JSON.stringify(componentInfo.props))

        // 保存操作
        this.saveOperate({
            type: 'update',
            mapUniqueKey: mapUniqueKey || this.currentEditComponentMapUniqueKey,
            update: {
                oldValue: this.oldProps,
                newValue
            }
        })
    }

    /**
     * 直接更新组件某个值，不记录历史
     */
    updateComponentValueWithNoHistory(field: string, value: FitGaea.ComponentPropsOptionValue) {
        let componentInfo = this.components.get(this.currentEditComponentMapUniqueKey)
        this.setPropsByField(componentInfo.props, field, value)
    }

    /**
     * 临时存储两个操作之间的 props，用来灵活记录历史记录
     */
    oldProps: FitGaea.ComponentProps = null

    /**
     * 根据 editOption 修改值
     */
    updateComponentOptionsValueByOptions(mapUniqueKey: string, editOptions: FitGaea.ComponentPropsGaeaEdit, value: FitGaea.ComponentPropsOptionValue) {
        let componentInfo = this.components.get(mapUniqueKey)

        // 修改组件值
        this.setPropsByFieldWithEditor(componentInfo.props, editOptions, value)
    }

    /**
     * 根据字符串或者数组，获取对象的值
     */
    getPropsByField(props: FitGaea.ComponentProps, editOptions: FitGaea.ComponentPropsGaeaEdit) {
        return _.at(props, editOptions.field)[0] as FitGaea.ComponentPropsOptionValue
    }

    /**
     * 获取适应编辑器的 props 值
     */
    getPropsByFieldWithEditor(props: FitGaea.ComponentProps, editOptions: FitGaea.ComponentPropsGaeaEdit) {
        let value = this.getPropsByField(props, editOptions)

        if (value === null || value === editOptions.emptyValue) {
            return ''
        }
        return value
    }

    /**
     * 根据字符串或者数组，设置对象的值
     */
    setPropsByField(props: FitGaea.ComponentProps, field: string, value: FitGaea.ComponentPropsOptionValue) {
        _.set(props, field, value)
    }

    /**
     * 从编辑器设置 props 值
     */
    setPropsByFieldWithEditor(props: FitGaea.ComponentProps, editOptions: FitGaea.ComponentPropsGaeaEdit, value: FitGaea.ComponentPropsOptionValue) {
        // 从编辑器来的值不可能是 null undefined，空值都用 '' 表示
        // 如果有 type，根据 type 做转换
        switch (editOptions.type) {
            case 'string':
                value = value.toString()
                break
            case 'number':
                value = Number(value)
                break
            case 'boolean':
                value = Boolean(value)
                break
        }

        if (value === '') {
            // 如果值是空，则赋值为空值，默认是 null
            value = editOptions.emptyValue || null
        }

        this.setPropsByField(props, editOptions.field, value)
    }

    /**
     * 最后一次选择中组件 id, 会随着取消选择变成 null
     */
    lastSelectMapUniqueKey: string = null

    /**
     * 设置最后一次高亮选择组件 id
     */
    setLastSelectMapUniqueKey(mapUniqueKey: string) {
        this.lastSelectMapUniqueKey = mapUniqueKey
    }

    /**
     * 获取增量编辑信息
     */
    getIncrementComponentsInfo() {
        // 获取 components 的 map, 但是要把 options 中除了 value 以外字段都干掉
        const cloneComponents = JSON.parse(JSON.stringify(this.components.toJSON()))

        Object.keys(cloneComponents).map(key=> {
            cloneComponents[key] = this.application.cleanComponent(cloneComponents[key])
        })

        return LZString.compressToBase64(JSON.stringify(cloneComponents))
    }

    /**
     * 添加一个新组件, 这个方法会在从工具栏拖拽新组件过来时使用
     */
    addNewComponent(mapUniqueKey: string, parentMapUniqueKey: string, uniqueId: string, index: number) {
        // 找到操作组件的 class
        const ComponentClass = this.application.getComponentByUniqueKey(uniqueId)

        // 从 startDragging 设置的 uniqueKey 生成新组件并且绑定上
        const newProps = extendObservable({}, _.cloneDeep(ComponentClass.defaultProps))

        let component: FitGaea.ViewportComponentInfo = {
            props: newProps,
            parentMapUniqueKey: parentMapUniqueKey
        }

        if (ComponentClass.defaultProps.canDragIn) {
            // 如果是个布局元素, 将其 layoutChilds 设置为数组
            component.layoutChilds = []
        }

        this.setComponents(mapUniqueKey, component)

        // 在父级中插入子元素
        this.components.get(parentMapUniqueKey).layoutChilds.splice(index, 0, mapUniqueKey)
    }

    /**
     * 添加一个已存在的 component 到它的父级
     * 需要保证这个组件的信息已经是完备的
     * 1. 存在于 this.components 中
     * 2. 如果是布局组件, 所有子元素也都存在于 this.components 中
     */
    addToParent(mapUniqueKey: string, parentMapUniqueKey: string, index: number) {
        // 修改那个元素的父级
        this.components.get(mapUniqueKey).parentMapUniqueKey = parentMapUniqueKey
        // 在父级中插入子元素
        this.components.get(parentMapUniqueKey).layoutChilds.splice(index, 0, mapUniqueKey)
    }

    /**
     * 添加一个复杂组件
     * 这个方法会在恢复元素时使用, 保证所有 key 都原封不动的恢复
     */
    addComplexComponent(parentMapUniqueKey: string, mapUniqueKey: string, index: number, componentFullInfo: FitGaea.ViewportComponentFullInfo) {
        // 先把子元素添加回来
        Object.keys(componentFullInfo.childs).forEach(childMapUniqueKey=> {
            const expendComponentInfo = this.application.expendComponent(JSON.parse(JSON.stringify(componentFullInfo.childs[childMapUniqueKey])))

            let component: FitGaea.ViewportComponentInfo = {
                props: extendObservable({}, expendComponentInfo.props),
                parentMapUniqueKey: expendComponentInfo.parentMapUniqueKey
            }

            if (expendComponentInfo.props.canDragIn) {
                // 如果是个布局元素, 将其 layoutChilds 设置为数组
                component.layoutChilds = expendComponentInfo.layoutChilds || []
            }
            this.setComponents(childMapUniqueKey, component)
        })

        // 再把这个组件添加回来
        const expendRootComponentInfo = this.application.expendComponent(JSON.parse(JSON.stringify(componentFullInfo.componentInfo)))

        let rootComponent: FitGaea.ViewportComponentInfo = {
            props: extendObservable({}, expendRootComponentInfo.props),
            parentMapUniqueKey: expendRootComponentInfo.parentMapUniqueKey
        }

        if (expendRootComponentInfo.props.canDragIn) {
            // 如果是个布局元素, 将其 layoutChilds 设置为数组
            rootComponent.layoutChilds = expendRootComponentInfo.layoutChilds || []
        }

        this.setComponents(mapUniqueKey, rootComponent)

        // 加到父级上
        this.addToParent(mapUniqueKey, parentMapUniqueKey, index)
    }

    /**
     * 操作记录 是 fast-json-patch 产生的 diff 对象
     */
    operates: Array<FitGaea.Diff> = []

    /**
     * 上一次操作的值
     */
    lastOperateComponents: any

    /**
     * 初始化上次操作记录
     */
    initLastOperateComponents(lastOperateComponents: any) {
        this.lastOperateComponents = lastOperateComponents
    }

    /**
     * 当前操作的 index
     */
    @observable nowOperateIndex = -1

    /**
     * 保存操作记录
     */
    @action('保存历史记录') saveOperate(diff: FitGaea.Diff) {
        // 如果处于编辑状态，不记录历史！
        if (this.currentEditPropsIndex !== null) {
            return
        }

        // 如果后面还有操作, 直接清空
        this.operates.splice(this.nowOperateIndex + 1)

        this.operates.push(diff)
        this.nowOperateIndex = this.operates.length - 1
    }

    /**
     * 删除 component
     */
    deleteComponent(mapUniqueKey: string, deleteChildComponents: {
        [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
    } = {}) {
        // 从父级删除这个 child
        // 能删除的都不是根元素, 一定有 parentMapUniqueKey 这个属性
        const parentComponent = this.components.get(this.components.get(mapUniqueKey).parentMapUniqueKey)
        const childIndex = parentComponent.layoutChilds.findIndex(item=>item === mapUniqueKey)
        parentComponent.layoutChilds.splice(childIndex, 1)

        // 删除子元素
        const component = this.components.get(mapUniqueKey)
        if (component.props.canDragIn) {
            JSON.parse(JSON.stringify(component.layoutChilds)).forEach((componentMapUniqueKey: string)=> {
                // 记录这个组件的信息
                deleteChildComponents[componentMapUniqueKey] = JSON.parse(JSON.stringify(this.components.get(componentMapUniqueKey)))

                // 删除之
                this.deleteComponent(componentMapUniqueKey, deleteChildComponents)
            })
        }

        this.components.delete(mapUniqueKey)

        return deleteChildComponents
    }

    /**
     * 操作 undo
     */
    undo() {
        if (this.nowOperateIndex <= -1) {
            return
        }

        // 先取消编辑状态
        this.cancelEditComponent()

        const operate = this.operates[this.nowOperateIndex]
        switch (operate.type) {
            case 'add':
                this.deleteComponent(operate.mapUniqueKey)
                break
            case 'update':
                this.components.get(operate.mapUniqueKey).props = extendObservable({}, _.cloneDeep(operate.update.oldValue))
                break
            case 'exchange':
                this.sortComponents(operate.mapUniqueKey, operate.exchange.newIndex, operate.exchange.oldIndex)
                break
            case 'move':
                // 找到这个元素现在的 mapUniqueKey
                const mapUniqueKey = this.components.get(operate.move.targetParentMapUniqueKey).layoutChilds.splice(operate.move.targetIndex, 1)[0]
                // 添加过去
                this.addToParent(mapUniqueKey, operate.move.sourceParentMapUniqueKey, operate.move.sourceIndex)
                break
            case 'remove':
                this.addComplexComponent(operate.remove.parentMapUniqueKey, operate.mapUniqueKey, operate.remove.index, operate.remove)
                break
            case 'paste':
                this.deleteComponent(operate.mapUniqueKey)
                break
            case 'reset':
                this.components.get(operate.mapUniqueKey).props = operate.reset.beforeProps
                break
            case 'addCombo':
                this.deleteComponent(operate.mapUniqueKey)
                break
            case 'addSource':
                this.deleteComponent(operate.mapUniqueKey)
                break
        }

        this.nowOperateIndex -= 1
    }

    /**
     * 操作 redo
     */
    redo() {
        if (this.nowOperateIndex >= this.operates.length - 1) {
            return
        }

        // 先取消编辑状态
        this.cancelEditComponent()

        this.nowOperateIndex += 1

        const operate = this.operates[this.nowOperateIndex]
        switch (operate.type) {
            case 'add':
                this.addNewComponent(operate.mapUniqueKey, operate.add.parentMapUniqueKey, operate.add.uniqueId, operate.add.index)
                break
            case 'update':
                this.components.get(operate.mapUniqueKey).props = extendObservable({}, _.cloneDeep(operate.update.newValue))
                break
            case 'exchange':
                this.sortComponents(operate.mapUniqueKey, operate.exchange.oldIndex, operate.exchange.newIndex)
                break
            case 'move':
                // 找到这个元素现在的 mapUniqueKey
                const mapUniqueKey = this.components.get(operate.move.sourceParentMapUniqueKey).layoutChilds.splice(operate.move.sourceIndex, 1)[0]
                // 添加过去
                this.addToParent(mapUniqueKey, operate.move.targetParentMapUniqueKey, operate.move.targetIndex)
                break
            case 'remove':
                this.deleteComponent(operate.mapUniqueKey)
                break
            case 'paste':
                this.addComplexComponent(operate.paste.parentMapUniqueKey, operate.mapUniqueKey, operate.paste.index, operate.paste)
                break
            case 'reset':
                const ComponentClass = this.application.getComponentByUniqueKey(operate.reset.beforeProps.gaeaUniqueKey)
                this.components.get(operate.mapUniqueKey).props = extendObservable({}, _.cloneDeep(ComponentClass.defaultProps))
                break
            case 'addCombo':
                this.addComplexComponent(operate.addCombo.parentMapUniqueKey, operate.mapUniqueKey, operate.addCombo.index, operate.addCombo.componentInfo)
                break
            case 'addSource':
                this.addComplexComponent(operate.addSource.parentMapUniqueKey, operate.mapUniqueKey, operate.addSource.index, operate.addSource.componentInfo)
                break
        }
    }

    /**
     * 是否能 undo
     */
    @computed get canUndo() {
        return this.nowOperateIndex > -1
    }

    /**
     * 是否能 redo
     */
    @computed get canRedo() {
        return this.nowOperateIndex < this.operates.length - 1
    }

    /**
     * 移动元素到另外一个父级是两个动作, 所以需要先存储移动到父级的 mapKey, 和移动到的位置
     */
    dragTargetMapUniqueKey: string = null
    dragTargetIndex: number = -1

    /**
     * 设置元素信息: 这个元素正在移动到另一个父级
     */
    setDragTarget(mapUniqueKey: string, index: number) {
        this.dragTargetMapUniqueKey = mapUniqueKey
        this.dragTargetIndex = index
    }

    /**
     * 鼠标 hover 状态元素的 mapUniqueKey
     */
    hoveringComponentMapUniqueKey: string = null

    /**
     * 设置鼠标 hover 状态元素的 mapUniqueKey
     */
    setHoveringComponentMapUniqueKey(mapUniqueKey: string) {
        this.hoveringComponentMapUniqueKey = mapUniqueKey
    }

    /**
     * 当前复制的组件的信息
     */
    copyComponent: FitGaea.ViewportComponentFullInfo = null

    /**
     * 复制组件
     */
    copy(mapUniqueKey: string) {
        if (!mapUniqueKey) {
            return true
        }

        this.copyComponent = this.getComponentFullInfoByMapUniqueKey(mapUniqueKey)
    }

    /**
     * 返回一个新的复制对象, 把所有 mapUniqueKey 都换成新的, 但引用关系保持不变
     */
    createCopyComponentWithNewUniqueKey(originComponent: FitGaea.ViewportComponentFullInfo, parentMapUniqueKey: string) {
        // 保持父子级引用关系不变, 重新生成 mapUniqueKey
        // [oldMapUniqueKey => newMapUniqueKey]
        const uniqueKeyMap = new Map()
        uniqueKeyMap.set(originComponent.mapUniqueKey, this.createUniqueId())

        originComponent.childs && Object.keys(originComponent.childs).forEach(childMapUniqueKey=> {
            uniqueKeyMap.set(childMapUniqueKey, this.createUniqueId())
        })

        // 更新 childs 的 mapUniqueKey
        let childs: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
        } = {}

        Object.keys(originComponent.childs).forEach(mapUniqueKey=> {
            const originChild = originComponent.childs[mapUniqueKey]

            childs[uniqueKeyMap.get(mapUniqueKey)] = {
                parentMapUniqueKey: uniqueKeyMap.get(originChild.parentMapUniqueKey),
                props: JSON.parse(JSON.stringify(originChild.props))
            }

            if (originChild.layoutChilds) {
                childs[uniqueKeyMap.get(mapUniqueKey)].layoutChilds = originChild.layoutChilds.map(childMapUniqueKey=>uniqueKeyMap.get(childMapUniqueKey))
            }
        })

        // 生成新的 copyComponent
        let newCopyComponent: FitGaea.ViewportComponentFullInfo = {
            mapUniqueKey: uniqueKeyMap.get(originComponent.mapUniqueKey),
            componentInfo: {
                parentMapUniqueKey: parentMapUniqueKey,
                props: JSON.parse(JSON.stringify(originComponent.componentInfo.props))
            },
            childs: childs
        }

        if (originComponent.componentInfo.layoutChilds) {
            newCopyComponent.componentInfo.layoutChilds = originComponent.componentInfo.layoutChilds.map(childMapUniqueKey=>uniqueKeyMap.get(childMapUniqueKey))
        }

        return newCopyComponent
    }

    /**
     * 粘贴到某个组件上
     */
    paste(parentMapUniqueKey: string) {
        if (!parentMapUniqueKey) {
            return true
        }

        if (!this.copyComponent) {
            return true
        }

        const parentComponent = this.components.get(parentMapUniqueKey)

        // 必须是布局组件
        if (!parentComponent.props.canDragIn) {
            return false
        }

        // 返回一个新 mapUniqueKey 的 copy 对象
        const newCopyComponent = this.createCopyComponentWithNewUniqueKey(this.copyComponent, parentMapUniqueKey)

        // 获得父级组件的子元素长度
        const parentChildCount = this.components.get(parentMapUniqueKey).layoutChilds.length

        this.addComplexComponent(parentMapUniqueKey, newCopyComponent.mapUniqueKey, parentChildCount, newCopyComponent)

        // 记录日志
        this.saveOperate({
            type: 'paste',
            mapUniqueKey: newCopyComponent.mapUniqueKey,
            paste: {
                parentMapUniqueKey,
                index: parentChildCount,
                mapUniqueKey: newCopyComponent.mapUniqueKey,
                componentInfo: newCopyComponent.componentInfo,
                childs: newCopyComponent.childs
            }
        })

        return true
    }

    /**
     * 获取一个已存在组件的完整信息, 返回的是一个新对象, 不用担心引用问题
     */
    getComponentFullInfoByMapUniqueKey(mapUniqueKey: string): FitGaea.ViewportComponentFullInfo {
        const componentInfo = this.components.get(mapUniqueKey)

        // 子元素信息
        let childs: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
        } = {}

        const mapChilds = (component: FitGaea.ViewportComponentInfo, childs: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
        })=> {
            if (component.props.canDragIn && component.layoutChilds) {
                JSON.parse(JSON.stringify(component.layoutChilds)).forEach((componentMapUniqueKey: string)=> {
                    const childInfo = this.components.get(componentMapUniqueKey)
                    childs[componentMapUniqueKey] = JSON.parse(JSON.stringify(childInfo))
                    mapChilds(childInfo, childs)
                })
            }
        }

        mapChilds(componentInfo, childs)

        return {
            mapUniqueKey,
            componentInfo: JSON.parse(JSON.stringify(componentInfo)),
            childs: childs
        }
    }

    /**
     * 是否显示右侧附加工具条
     */
    @observable isShowSidebarAddon = false

    showSidebarAddon() {
        this.isShowSidebarAddon = true
        // 显示工具条动画是 200 毫秒
        setTimeout(()=> {
            // 动画结束后，重置外边框位置
            this.resetComponentOutline()
        }, 210)
    }

    hideSidebarAddon() {
        this.isShowSidebarAddon = false
        setTimeout(()=> {
            // 动画结束后，重置外边框位置
            this.resetComponentOutline()
        }, 210)
    }

    /**
     * 是否显示左侧附加工具条
     */
    @observable isShowLeftBar = false

    /**
     * 左侧附加工具条显示的是哪种板块
     */
    @observable leftBarType = ''

    showLeftBar(leftBarType: string) {
        this.leftBarType = leftBarType
        this.isShowLeftBar = true
    }

    hideLeftBar() {
        this.leftBarType = ''
        this.isShowLeftBar = false
    }

    /**
     * 根据 mapUniqueKey 删除组件，并记录历史
     */
    deleteComponentByMapUniqueKeyWithHistory(mapUniqueKey: string) {
        // 找到父级 mapUniqueKey, 记录历史操作使用
        const parentMapUniqueKey = this.components.get(mapUniqueKey).parentMapUniqueKey

        // 最外层不能被删
        if (parentMapUniqueKey === null) {
            return
        }

        // 存储组件信息
        const componentInfo = JSON.parse(JSON.stringify(this.components.get(mapUniqueKey)))

        // 找到是父级的第几个
        const index = this.components.get(parentMapUniqueKey).layoutChilds.findIndex(item=>item === mapUniqueKey)

        // 取消编辑状态
        this.cancelEditComponent()

        // 删除
        const deleteChildsComponents = this.deleteComponent(mapUniqueKey)

        this.saveOperate({
            type: 'remove',
            mapUniqueKey: mapUniqueKey,
            remove: {
                mapUniqueKey: mapUniqueKey,
                parentMapUniqueKey,
                // 删除的位置
                index,
                // 组件信息
                componentInfo: componentInfo,
                // 子元素列表 （包括非直接子集）
                childs: deleteChildsComponents
            }
        })
    }

    /**********************
     * 事件系列
     **********************/

    /**
     * 新增一个事件
     */
    addEvent(mapUniqueKey: string, isWeb: boolean) {
        const componentInfo = this.components.get(mapUniqueKey)

        const eventData: FitGaea.EventData = {
            type: 'init',
            event: 'none',
            typeIndex: -1,
            eventIndex: -1
        }

        // data 虽然开始定义没有，但在页面新建实例会自动创建，否则就无法绑定。所以此处肯定存在 data
        if (isWeb) {
            componentInfo.props.gaeaEventData.push(eventData)
        } else {
            componentInfo.props.gaeaNativeEventData.push(eventData)
        }
    }

    /**
     * 删除一个事件
     */
    removeEvent(mapUniqueKey: string, index: number, isWeb: boolean) {
        const componentInfo = this.components.get(mapUniqueKey)

        if (isWeb) {
            componentInfo.props.gaeaEventData.splice(index, 1)
        } else {
            componentInfo.props.gaeaNativeEventData.splice(index, 1)
        }
    }

    /**
     * 更新事件触发条件
     */
    updateEventTriggerCondition(mapUniqueKey: string, dataIndex: number, typeIndex: string, isWeb: boolean) {
        const componentInfo = this.components.get(mapUniqueKey)
        const eventDataName = isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'

        if (isNaN(Number(typeIndex))) {
            transaction(()=> {
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.type`, typeIndex)
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.typeIndex`, -1)
            })

            switch (typeIndex) {
                case 'listen':
                    _.set(componentInfo.props, `${eventDataName}.${dataIndex}.typeData`, observable({
                        listen: ''
                    }))
                    break
            }
            return
        }

        const eventType = componentInfo.props.gaeaEvent.types[Number(typeIndex)]

        transaction(()=> {
            _.set(componentInfo.props, `${eventDataName}.${dataIndex}.type`, eventType.type)
            _.set(componentInfo.props, `${eventDataName}.${dataIndex}.typeIndex`, Number(typeIndex))
        })
    }

    /**
     * 更新事件触发动作
     */
    updateEventAction(mapUniqueKey: string, dataIndex: number, eventIndex: string, isWeb: boolean) {
        const componentInfo = this.components.get(mapUniqueKey)
        const eventDataName = isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'

        if (isNaN(Number(eventIndex))) {
            transaction(()=> {
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.event`, eventIndex)
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.eventIndex`, -1)
            })

            switch (eventIndex) {
                case 'emit':
                    _.set(componentInfo.props, `${eventDataName}.${dataIndex}.eventData`, observable({
                        emit: ''
                    }))
                    break
            }
            return
        }

        const eventAction = componentInfo.props.gaeaEvent.events[Number(eventIndex)]
        transaction(()=> {
            _.set(componentInfo.props, `${eventDataName}.${dataIndex}.event`, eventAction.event)
            _.set(componentInfo.props, `${eventDataName}.${dataIndex}.eventIndex`, Number(eventIndex))
        })

        // 初始化 gaeaEvent.data
        switch (eventAction.event) {
            case 'jumpUrl':
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.eventData`, observable({
                    url: ''
                }))
                break
            case 'call':
                let fields: {
                    [key: string]: any
                } = {}
                eventAction.call.param && eventAction.call.param.forEach(param=> {
                    fields[param.field] = null as any
                })
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.eventData`, observable(fields))
                break
        }
    }

    /**
     * 更新事件数据
     */
    updateEventData(mapUniqueKey: string, field: string, value: any) {
        const componentInfo = this.components.get(mapUniqueKey)
        _.set(componentInfo.props, field, value)
    }

    // 获取所有 event 事件名列表
    getEventListName = ()=> {
        const eventList: Array<string> = []
        this.components.forEach(component=> {
            component.props.gaeaEventData.forEach(eventData=> {
                if (eventData.event === 'emit') {
                    eventList.push((eventData.eventData as FitGaea.EventActionEvent).emit)
                }
            })
        })
        return eventList
    }

    /**
     * 将事件配置复制一份给 native
     */
    copyEventToNative(mapUniqueKey: string) {
        const componentInfo = this.components.get(mapUniqueKey)
        componentInfo.props.gaeaNativeEventData = observable(JSON.parse(JSON.stringify(componentInfo.props.gaeaEventData))) as any
    }

    /**
     * 删除 native 的事件配置
     */
    removeNativeEvent(mapUniqueKey: string) {
        const componentInfo = this.components.get(mapUniqueKey)
        componentInfo.props.gaeaNativeEventData = observable([])
    }

    /**
     * 修改某个 absolute 元素的 x y 属性
     */
    updateAbsoluteXY(mapUniqueKey: string, x: number, y: number) {
        const componentInfo = this.components.get(mapUniqueKey)

        if (componentInfo.props.style.left !== null) {
            componentInfo.props.style.left += x
        } else {
            componentInfo.props.style.right += x
        }

        if (componentInfo.props.style.top !== null) {
            componentInfo.props.style.top += y
        } else {
            componentInfo.props.style.bottom += y
        }
    }

    @action('新增一个变量配置') addVariable(mapUniqueKey: string, variableInfo: FitGaea.VariableData) {
        const componentInfo = this.components.get(mapUniqueKey)

        // 如果已经设置了这个变量，先删除
        const existIndex = componentInfo.props.gaeaVariables.findIndex(variable=>variable.field === variableInfo.field)
        if (existIndex > -1) {
            componentInfo.props.gaeaVariables.splice(existIndex, 1)
        }

        componentInfo.props.gaeaVariables.push(variableInfo)
    }

    @action('删除一个变量配置') removeVariable(mapUniqueKey: string, field: string) {
        const componentInfo = this.components.get(mapUniqueKey)
        const existIndex = componentInfo.props.gaeaVariables.findIndex(variable=>variable.field === field)
        if (existIndex > -1) {
            componentInfo.props.gaeaVariables.splice(existIndex, 1)
        }
    }

    /**
     * 通过 name 查询组件
     */
    findComponentsByName(name: string) {
        const components: Array<FitGaea.ViewportComponentInfo> = []
        this.components.forEach(component=> {
            if (component.props.gaeaName === name) {
                components.push(component)
            }
        })
        return components
    }

    /**
     * 查询当前页面所有组件名，以及数量
     */
    getNamesWithCount() {
        const nameMap = new Map<string,number>()
        this.components.forEach(component=> {
            if (nameMap.has(component.props.gaeaName)) {
                nameMap.set(component.props.gaeaName, nameMap.get(component.props.gaeaName) + 1)
            } else {
                nameMap.set(component.props.gaeaName, 1)
            }
        })

        const nameArray: Array<{
            name: string
            count: number
        }> = []
        nameMap.forEach((count, name)=> {
            nameArray.push({count, name})
        })
        return nameArray
    }

    /**
     * 编辑状态下，当前是否正在修改属性
     */
    @observable currentEditPropsIndex?: number = null as number

    /**
     * 编辑状态下，属于是否属于 web 事件
     */
    currentEditIsWeb = false
    currentEditEventIndex = 0

    temporaryOriginProps?: FitGaea.ComponentProps = null

    setCurrentEditPropsIndex(index: number, eventProps?: FitGaea.ComponentProps, currentEditIsWeb?: boolean, eventIndex?: number) {
        const componentInfo = this.components.get(this.currentEditComponentMapUniqueKey)

        // 要给组件赋的值
        let componentProps: FitGaea.ComponentProps = null

        if (index !== null) {
            this.currentEditIsWeb = currentEditIsWeb
            this.currentEditEventIndex = eventIndex
            // 设置了一个新的关键帧
            // 临时保存编辑组件的 props
            if (this.currentEditPropsIndex === null) {
                // 如果当前编辑 props 索引是空才赋值，为了避免在已点击的情况下，又点击了另一个，覆盖了原来属性
                this.temporaryOriginProps = this.application.cleanComponentProps(componentInfo.props)
            }
            // 将事件 props 赋值上
            componentProps = this.completionEditProps(extendObservable({}, this.application.expendComponentProps(eventProps)) as FitGaea.ComponentProps)
        } else {
            // 取消关键帧
            // 还原组件的 props
            componentProps = this.completionEditProps(extendObservable({}, this.application.expendComponentProps(this.temporaryOriginProps)) as FitGaea.ComponentProps)
            this.temporaryOriginProps = null
        }

        // 覆盖当前编辑的索引
        this.currentEditPropsIndex = index

        // 只覆盖非 gaea 开头的属性
        componentProps && Object.keys(componentProps).forEach(key=> {
            if (!_.startsWith(key, 'gaea')) {
                componentInfo.props[key] = componentProps[key]
            }
        })
    }
}


