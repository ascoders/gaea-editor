/**
 * 编辑可视区域
 */

import {observable, computed, map, transaction, ObservableMap} from 'mobx'
import * as _ from 'lodash'
import Application from './application'

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
     * 添加一个新实例元素, 不要用 componentsSet
     */
    setComponents(mapUniqueKey: string, componentInfo: FitGaea.ViewportComponentInfo) {
        // 遍历 gaeaEdit, 如果值是 undefined || null , 设置为 isNull
        if (componentInfo.props.gaeaEdit) {
            componentInfo.props.gaeaEdit = componentInfo.props.gaeaEdit.map(gaeaEdit=> {
                // 豁免一些类型
                if (['marginPadding'].findIndex(name=>name === gaeaEdit.editor) > -1) {
                    gaeaEdit.isNull = false
                } else {
                    if (componentInfo.props[gaeaEdit.field] === undefined || componentInfo.props[gaeaEdit.field] === null) {
                        gaeaEdit.isNull = true
                    } else {
                        gaeaEdit.isNull = false
                    }
                }

                return gaeaEdit
            })
        }
        this.components.set(mapUniqueKey, componentInfo)
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

        // 开始重置
        transaction(()=> {
            component.props = _.cloneDeep(ComponentClass.defaultProps)
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
        } else {
            let mapUniqueKey: string

            if (this.currentMovingComponent.isNew) {
                // 添加一个全新的 component
                mapUniqueKey = this.createUniqueId()
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
     */
    startDragging(childMapUniqueKey: string, uniqueKey: string, isNew: boolean, dragStartParentElement: Element = null, dragStartIndex = 0) {
        this.isMovingComponent = true
        this.dragStartParentElement = dragStartParentElement
        this.dragStartIndex = dragStartIndex
        this.currentMovingComponent = {
            mapUniqueKey: childMapUniqueKey,
            // 组件的唯一标识
            uniqueKey,
            isNew
        }
    }

    /**
     * 结束拖拽
     */
    endDragging() {
        this.isMovingComponent = false
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
        this.currentEditComponentMapUniqueKey = null
        this.hideSidebarAddon()

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
     * 编辑当前组件, 某个选项的值，附带保存历史
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
                editOptions: JSON.parse(JSON.stringify(editOptions)),
                oldValue,
                newValue
            }
        })
    }

    /**
     * 根据 editOption 修改值
     */
    updateComponentOptionsValueByOptions(mapUniqueKey: string, editOptions: FitGaea.ComponentPropsGaeaEdit, value: FitGaea.ComponentPropsOptionValue) {
        let componentInfo = this.components.get(mapUniqueKey)

        if (value !== null) {
            // 不能让 null 设置无效, 所以非 null 才做转换
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
        }

        // 修改组件值
        switch (editOptions.editor) {
            case 'marginPadding':
                componentInfo.props['marginLeft'] = value['marginLeft']
                componentInfo.props['marginTop'] = value['marginTop']
                componentInfo.props['marginRight'] = value['marginRight']
                componentInfo.props['marginBottom'] = value['marginBottom']
                componentInfo.props['paddingLeft'] = value['paddingLeft']
                componentInfo.props['paddingTop'] = value['paddingTop']
                componentInfo.props['paddingRight'] = value['paddingRight']
                componentInfo.props['paddingBottom'] = value['paddingBottom']
                break
            default:
                componentInfo.props[editOptions.field] = value
        }
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
            // icon 不会变
            delete cloneComponents[key].props.icon

            // 获取这个组件的 defaultProps
            const defaultProps = this.application.getComponentByUniqueKey(cloneComponents[key].props.gaeaUniqueKey).defaultProps

            // 如果 name 相同, 删了
            if (cloneComponents[key].props.name == defaultProps.name) {
                delete cloneComponents[key].props.name
            }

            // 对 props 进行瘦身
            const props = cloneComponents[key].props
            props && Object.keys(props).forEach(propsKey=> {
                // gaeaUniqueKey 必须留着
                if (propsKey === 'gaeaUniqueKey') {
                    return
                }

                // gaeaEdit 直接删
                if (propsKey === 'gaeaEdit') {
                    delete props[propsKey]
                    return
                }

                // 判断值相等就行了
                if (props[propsKey] == defaultProps[propsKey]) {
                    // 如果和初始值相同, 就销毁
                    delete props[propsKey]
                }
            })

            // layoutChilds 长度为 0 就干掉
            if (cloneComponents[key].layoutChilds.length === 0) {
                delete cloneComponents[key].layoutChilds
            }

            // 如果 props 已经被删完了, 直接删掉 props
            if (!props || Object.keys(props).length === 0) {
                delete cloneComponents[key].props.options
            }
        })

        return cloneComponents
    }

    /**
     * 添加一个新组件, 这个方法会在从工具栏拖拽新组件过来时使用
     */
    addNewComponent(mapUniqueKey: string, parentMapUniqueKey: string, uniqueId: string, index: number) {
        // 找到操作组件的 class
        const ComponentClass = this.application.getComponentByUniqueKey(uniqueId)

        // 从 startDragging 设置的 uniqueKey 生成新组件并且绑定上
        const newProps = _.cloneDeep(ComponentClass.defaultProps)

        let component: FitGaea.ViewportComponentInfo = {
            props: newProps,
            parentMapUniqueKey: parentMapUniqueKey,
            layoutChilds: []
        }

        if (uniqueId === 'gaea-layout') {
            // 如果是个布局元素, 将其 layoutChilds 设置为数组
            component.layoutChilds = []
        }

        transaction(()=> {
            this.setComponents(mapUniqueKey, component)
        })

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
            this.setComponents(childMapUniqueKey, _.cloneDeep(componentFullInfo.childs[childMapUniqueKey]))
        })

        // 再把这个组件添加回来
        this.setComponents(mapUniqueKey, _.cloneDeep(componentFullInfo.componentInfo))

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
     * 保存操作记录 需要保存的时机:
     * 新增元素 ok
     * 移动元素 ok
     * 交换元素 ok
     * 删除元素 ok
     * 修改元素 ok
     */
    saveOperate(diff: FitGaea.Diff) {
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
        if (component.props.gaeaUniqueKey === 'gaea-layout') {
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
                this.components.get(operate.mapUniqueKey).props = _.cloneDeep(operate.update.oldValue)
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
                this.components.get(operate.mapUniqueKey).props = _.cloneDeep(operate.update.newValue)
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
                this.components.get(operate.mapUniqueKey).props = _.cloneDeep(ComponentClass.defaultProps)
                break
            case 'addCombo':
                this.addComplexComponent(operate.addCombo.parentMapUniqueKey, operate.mapUniqueKey, operate.addCombo.index, operate.addCombo.componentInfo)
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
        if (originComponent.componentInfo.props.gaeaUniqueKey === 'gaea-layout') {
            Object.keys(originComponent.childs).forEach(childMapUniqueKey=> {
                uniqueKeyMap.set(childMapUniqueKey, this.createUniqueId())
            })
        }

        // 更新 childs 的 mapUniqueKey
        let childs: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
        } = {}

        Object.keys(originComponent.childs).forEach(mapUniqueKey=> {
            const originChild = originComponent.childs[mapUniqueKey]
            childs[uniqueKeyMap.get(mapUniqueKey)] = {
                parentMapUniqueKey: uniqueKeyMap.get(originChild.parentMapUniqueKey),
                props: JSON.parse(JSON.stringify(originChild.props)),
                layoutChilds: originChild.layoutChilds.map(childMapUniqueKey=>uniqueKeyMap.get(childMapUniqueKey))
            }
        })

        // 生成新的 copyComponent
        let newCopyComponent: FitGaea.ViewportComponentFullInfo = {
            mapUniqueKey: uniqueKeyMap.get(originComponent.mapUniqueKey),
            componentInfo: {
                parentMapUniqueKey: parentMapUniqueKey,
                props: JSON.parse(JSON.stringify(originComponent.componentInfo.props)),
                layoutChilds: originComponent.componentInfo.layoutChilds.map(childMapUniqueKey=>uniqueKeyMap.get(childMapUniqueKey))
            },
            childs: childs
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
        if (parentComponent.props.gaeaUniqueKey !== 'gaea-layout') {
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
     * 获取一个已存在组件的完整信息
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
            if (component.props.gaeaUniqueKey === 'gaea-layout') {
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
}