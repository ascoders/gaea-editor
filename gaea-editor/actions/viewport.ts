import {inject} from 'inject-instance'
import {action, observable, extendObservable, transaction, map, asMap, isObservable} from 'mobx'
import ViewportStore from '../stores/viewport'
import ApplicationAction from '../actions/application'
import EventAction from '../actions/event'
import EventStore from '../stores/event'
import * as Sortable from 'sortablejs'
import * as _ from 'lodash'
import * as LZString from 'lz-string'
import {hasClass, removeClass} from '../utils/dom'

export default class ViewportAction {
    @inject('ViewportStore') private viewport: ViewportStore
    @inject('ApplicationAction') private applicationAction: ApplicationAction
    @inject('EventAction') private eventAction: EventAction
    @inject('EventStore') private event: EventStore

    @observable observableClass = true

    @action('设置根节点唯一标识') setRootMapUniqueKey(mapUniqueKey: string) {
        this.viewport.rootMapUniqueKey = mapUniqueKey
    }

    @action('设置视图区域 dom 节点') setViewportDom(dom: HTMLElement) {
        this.viewport.viewportDom = dom
    }

    @action('在视图中设置组件信息') setComponent(mapUniqueKey: string, componentInfo: FitGaea.ViewportComponentInfo) {
        let componentInfoClone = _.cloneDeep(componentInfo)

        componentInfoClone.props = this.completionEditProps(componentInfo.props)

        if (componentInfoClone.parentMapUniqueKey === null) {
            // 最外层必须相对定位，不能修改
            componentInfoClone.props.gaeaEdit = componentInfoClone.props.gaeaEdit.filter((edit: any) => edit.editor !== 'position' && edit !== '定位')
        }

        const middlewares = this.viewport.middleware.get('setComponent')
        if (middlewares) {
            middlewares.forEach(middleware => {
                componentInfo = middleware(mapUniqueKey, componentInfo)
            })
        }

        if (!isObservable(componentInfoClone.props)) {
            componentInfoClone.props = extendObservable({}, componentInfoClone.props)
        }

        this.viewport.components.set(mapUniqueKey, componentInfoClone)
    }

    @action('新增全新的组件') addNewComponent(uniqueKey: string, parentMapUniqueKey: string, index: number) {
        const mapUniqueKey = this.createUniqueKey()

        // 找到操作组件的 class
        const ComponentClass = this.applicationAction.getComponentClassByGaeaUniqueKey(uniqueKey)

        // 从 startDragging 设置的 uniqueKey 生成新组件并且绑定上
        const newProps = _.cloneDeep(ComponentClass.defaultProps)

        let component: FitGaea.ViewportComponentInfo = {
            props: newProps,
            parentMapUniqueKey: parentMapUniqueKey
        }

        if (ComponentClass.defaultProps.canDragIn) {
            // 如果是个布局元素, 将其 layoutChilds 设置为数组
            component.layoutChilds = []
        }

        this.setComponent(mapUniqueKey, component)

        // 在父级中插入子元素
        this.viewport.components.get(parentMapUniqueKey).layoutChilds.splice(index, 0, mapUniqueKey)

        return mapUniqueKey
    }

    @action('移动组件') moveComponent(sourceMapUniqueKey: string, sourceIndex: number, targetMapUniqueKey: string, targetIndex: number) {
        const sourceComponentInfo = this.viewport.components.get(sourceMapUniqueKey)
        const targetComponentInfo = this.viewport.components.get(targetMapUniqueKey)

        // 移动元素的 mapUniqueKey
        const moveComponentMapUniqueKey = sourceComponentInfo.layoutChilds[sourceIndex]

        // 找到移动元素的信息
        const moveComponentInfo = this.viewport.components.get(moveComponentMapUniqueKey)

        // 修改拖拽元素的 parentMapUniqueKey
        moveComponentInfo.parentMapUniqueKey = targetMapUniqueKey
        // 在拖拽目标 layoutChilds 中插入子元素
        targetComponentInfo.layoutChilds.splice(targetIndex, 0, moveComponentMapUniqueKey)

        // 拖拽源删除元素
        sourceComponentInfo.layoutChilds.splice(sourceIndex, 1)
    }

    @action('组件在同父级移动位置') horizontalMoveComponent(parentMapUniqueKey: string, beforeIndex: number, afterIndex: number) {
        const layoutChilds = this.viewport.components.get(parentMapUniqueKey).layoutChilds
        if (beforeIndex < afterIndex) {
            // 从左到右
            transaction(() => {
                for (let index = beforeIndex; index < afterIndex; index++) {
                    const beforeUniqueKey = layoutChilds[index]
                    const afterUniqueKey = layoutChilds[index + 1]
                    layoutChilds[index] = afterUniqueKey
                    layoutChilds[index + 1] = beforeUniqueKey
                }
            })
        } else {
            // 从右到左
            transaction(() => {
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
     * 添加一个复杂组件
     * 这个方法会在恢复元素时使用, 保证所有 key 都原封不动的恢复
     * 所以如果是新模版组件，请先调用 createCopyComponentWithNewUniqueKey 生成新的一套 uniqueKey
     */
    @action('新增模板组件') addComboComponent(parentMapUniqueKey: string, componentFullInfo: FitGaea.ViewportComponentFullInfo, index: number) {
        // 先把子元素添加回来
        Object.keys(componentFullInfo.childs).forEach(childMapUniqueKey => {
            const expendComponentInfo = this.applicationAction.expendComponent(JSON.parse(JSON.stringify(componentFullInfo.childs[childMapUniqueKey])))

            let component: FitGaea.ViewportComponentInfo = {
                props: extendObservable({}, expendComponentInfo.props),
                parentMapUniqueKey: expendComponentInfo.parentMapUniqueKey
            }

            if (expendComponentInfo.props.canDragIn) {
                // 如果是个布局元素, 将其 layoutChilds 设置为数组
                component.layoutChilds = expendComponentInfo.layoutChilds || []
            }
            this.setComponent(childMapUniqueKey, component)
        })

        // 再把这个组件添加回来
        const expendRootComponentInfo = this.applicationAction.expendComponent(JSON.parse(JSON.stringify(componentFullInfo.componentInfo)))

        let rootComponent: FitGaea.ViewportComponentInfo = {
            props: extendObservable({}, expendRootComponentInfo.props),
            parentMapUniqueKey: expendRootComponentInfo.parentMapUniqueKey
        }

        if (expendRootComponentInfo.props.canDragIn) {
            // 如果是个布局元素, 将其 layoutChilds 设置为数组
            rootComponent.layoutChilds = expendRootComponentInfo.layoutChilds || []
        }

        this.setComponent(componentFullInfo.mapUniqueKey, rootComponent)

        // 加到父级上
        this.addToParent(componentFullInfo.mapUniqueKey, parentMapUniqueKey, index)
    }

    @action('新增模板组件，源码是压缩后的') addComboComponentBySource(parentMapUniqueKey: string, componentFullInfoSource: string, index: number) {
        const componentFullInfo: FitGaea.ViewportComponentFullInfo = JSON.parse(LZString.decompressFromBase64(componentFullInfoSource))

        // 生成新的 uniqueKey，并将最顶层组件与父级 uniqueKey 绑定
        let componentFullInfoCopy = this.createCopyComponentWithNewUniqueKey(componentFullInfo, parentMapUniqueKey)

        // 由于模板信息是瘦身后的，补全信息
        componentFullInfoCopy.componentInfo = this.applicationAction.expendComponent(componentFullInfoCopy.componentInfo)
        Object.keys(componentFullInfoCopy.childs).forEach(childKey => {
            componentFullInfoCopy.childs[childKey] = this.applicationAction.expendComponent(componentFullInfoCopy.childs[childKey])
        })

        this.addComboComponent(parentMapUniqueKey, componentFullInfoCopy, index)
    }

    @action('移除组件') removeComponent(mapUniqueKey: string) {
        const removeComponentInfo = this.viewport.components.get(mapUniqueKey)

        // 根节点无法删除
        if (removeComponentInfo.parentMapUniqueKey === null) {
            throw '不能删除根节点'
        }

        transaction(() => {
            // 删除这个组件的子组件
            const childMapUniqueKeys = this.getAllChildsByMapUniqueKey(mapUniqueKey)
            childMapUniqueKeys.forEach(childMapUniqueKey => {
                this.viewport.components.delete(childMapUniqueKey)
            })

            // 找到被删除组件的父组件
            const parentComponentInfo = this.viewport.components.get(removeComponentInfo.parentMapUniqueKey)
            // 从父组件的孩子节点列表中移除
            parentComponentInfo.layoutChilds = parentComponentInfo.layoutChilds.filter(childMapUniqueKey => childMapUniqueKey !== mapUniqueKey)

            // 从 store 中删除
            this.viewport.components.delete(mapUniqueKey)

            // 如果要删除的组件就是正在编辑的组件，退出编辑状态
            if (mapUniqueKey === this.viewport.currentEditComponentMapUniqueKey) {
                this.setCurrentEditComponentMapUniqueKey(null)
            }
            // 如果要删除的组件就是正在 hover 的组件，退出编辑状态
            if (mapUniqueKey === this.viewport.currentHoverComponentMapUniqueKey) {
                this.setCurrentHoverComponentMapUniqueKey(null)
            }
        })
    }

    @action('设置当前 hover 元素的 mapUniqueKey') setCurrentHoverComponentMapUniqueKey(mapUniqueKey: string) {
        this.viewport.currentHoverComponentMapUniqueKey = mapUniqueKey
    }

    @action('设置当前 edit 元素的 mapUniqueKey') setCurrentEditComponentMapUniqueKey(mapUniqueKey: string) {
        // 如果和当前正在编辑元素相同，不做操作
        if (this.viewport.currentEditComponentMapUniqueKey === mapUniqueKey) {
            return
        }

        // 过 150 毫秒再显示编辑区域，不让动画被阻塞
        setTimeout(() => {
            this.viewport.showEditComponents = !!mapUniqueKey
        }, 150)

        const selectClass = 'gaea-selected'

        // 把上一个元素选中样式置空
        if (this.viewport.currentEditComponentMapUniqueKey !== null) {
            const prevEditDom = this.viewport.componentDomInstances.get(this.viewport.currentEditComponentMapUniqueKey)
            if (hasClass(prevEditDom, selectClass)) {
                removeClass(prevEditDom, selectClass)
            }
        }

        // 设置新元素为选中样式
        if (mapUniqueKey!==null){
            const nextEditDom = this.viewport.componentDomInstances.get(mapUniqueKey)
            nextEditDom.className += ` ${selectClass}`
        }

        // 修改 mapUniqueKey
        this.viewport.currentEditComponentMapUniqueKey = mapUniqueKey
    }

    @action('生成唯一 key') createUniqueKey() {
        return _.uniqueId('gaea-component-' + new Date().getTime() + '-')
    }

    @action('设置视图 dom 实例') setDomInstance(mapUniqueKey: string, dom: HTMLElement) {
        this.viewport.componentDomInstances.set(mapUniqueKey, dom)
    }

    @action('移除一个视图 dom 实例') removeDomInstance(mapUniqueKey: string) {
        this.viewport.componentDomInstances.delete(mapUniqueKey)
    }

    @action('开始拖拽') startDrag(dragInfo: FitGaea.CurrentDragComponentInfo) {
        this.viewport.currentDragComponentInfo = dragInfo
    }

    @action('结束拖拽') endDrag() {
        this.viewport.currentDragComponentInfo = null
    }

    @action('从视图中移动到新父级时，设置拖拽目标（父级）的信息') setDragTargetInfo(mapUniqueKey: string, index: number) {
        this.viewport.currentDragComponentInfo.viewportInfo.targetMapUniqueKey = mapUniqueKey
        this.viewport.currentDragComponentInfo.viewportInfo.targetIndex = index
    }

    @action('设置布局元素是否高亮') setLayoutComponentActive(active: boolean) {
        this.viewport.isLayoutComponentActive = active
    }

    @action('修改当前编辑组件的组件属性') updateCurrentEditComponentProps(field: string, value: any) {
        this.updateComponentProps(this.viewport.currentEditComponentMapUniqueKey, field, value)
    }

    @action('修改组件属性') updateComponentProps(mapUniqueKey: string, field: string, value: any) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)
        _.set(componentInfo.props, field, value)
    }

    @action('重置属性') resetProps(mapUniqueKey: string) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)
        const ComponentClass = this.applicationAction.getComponentClassByGaeaUniqueKey(componentInfo.props.gaeaUniqueKey)
        componentInfo.props = extendObservable({}, _.cloneDeep(ComponentClass.defaultProps))
    }

    @action('清空当前状态') clean() {
        transaction(() => {
            this.viewport.currentEditComponentMapUniqueKey = null
            this.viewport.currentHoverComponentMapUniqueKey = null
            this.viewport.currentDragComponentInfo = null
            this.viewport.showEditComponents = false
        })
    }

    /**
     * 需要保证这个组件的信息已经是完备的
     * 1. 存在于 this.components 中
     * 2. 如果是布局组件, 所有子元素也都存在于 this.components 中
     */
    @action('添加一个已存在的 component 到它的父级') addToParent(mapUniqueKey: string, parentMapUniqueKey: string, index: number) {
        // 修改那个元素的父级
        this.viewport.components.get(mapUniqueKey).parentMapUniqueKey = parentMapUniqueKey
        // 在父级中插入子元素
        this.viewport.components.get(parentMapUniqueKey).layoutChilds.splice(index, 0, mapUniqueKey)
    }

    /**
     * 补全编辑状态的配置 会修改原对象
     */
    completionEditProps(componentProps: FitGaea.ComponentProps) {
        if (!componentProps.gaeaEventData) {
            componentProps.gaeaEventData = []
        }
        if (!componentProps.gaeaNativeEventData) {
            componentProps.gaeaNativeEventData = []
        }

        const middlewares = this.viewport.middleware.get('completionEditProps')
        if (middlewares) {
            middlewares.forEach(middleware => {
                componentProps = middleware(componentProps)
            })
        }

        return componentProps
    }

    /**
     * 注册子元素内部拖动
     * 指的是当前元素与视图元素一一对应，拖拽相当于视图元素的拖拽，可以实现例如 treePlugin
     */
    registerInnerDrag(mapUniqueKey: string, dragParentElement: HTMLElement, groupName = 'gaea-can-drag-in', sortableParam: any = {}) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)

        Sortable.create(dragParentElement, Object.assign({
            animation: 150,
            // 放在一个组里,可以跨组拖拽
            group: {
                name: groupName,
                pull: true,
                put: true
            },
            onStart: (event: any) => {
                this.startDrag({
                    type: 'viewport',
                    dragStartParentElement: dragParentElement,
                    dragStartIndex: event.oldIndex as number,
                    viewportInfo: {
                        mapUniqueKey: componentInfo.layoutChilds[event.oldIndex as number]
                    }
                })
            },
            onEnd: (event: any) => {
                this.endDrag()

                // 在 viewport 中元素拖拽完毕后, 为了防止 outer-move-box 在原来位置留下残影, 先隐藏掉
                this.setCurrentHoverComponentMapUniqueKey(null)
            },
            onAdd: (event: any) => {
                switch (this.viewport.currentDragComponentInfo.type) {
                    case 'new':
                        // 是新拖进来的, 不用管, 因为工具栏会把它收回去
                        // 为什么不删掉? 因为这个元素不论是不是 clone, 都被移过来了, 不还回去 react 在更新 dom 时会无法找到
                        const newMapUniqueKey = this.addNewComponent(this.viewport.currentDragComponentInfo.newInfo.uniqueKey, mapUniqueKey, event.newIndex as number)

                        // TODO 触发新增事件
                        // this.props.viewport.saveOperate({
                        //     type: 'add',
                        //     mapUniqueKey,
                        //     add: {
                        //         uniqueId: this.props.viewport.currentMovingComponent.uniqueKey,
                        //         parentMapUniqueKey: this.props.mapUniqueKey,
                        //         index: event.newIndex as number
                        //     }
                        // })
                        break

                    case 'viewport':
                        // 这里只还原 dom，和记录拖拽源信息，不会修改 components 数据，跨层级移动在 remove 回调中修改
                        // 是从视图区域另一个元素移过来，而且是新增的,而不是同一个父级改变排序
                        // 把这个元素还给之前拖拽的父级
                        if (this.viewport.currentDragComponentInfo.dragStartParentElement.childNodes.length === 0) {
                            // 之前只有一个元素
                            this.viewport.currentDragComponentInfo.dragStartParentElement.appendChild(event.item)
                        } else if (this.viewport.currentDragComponentInfo.dragStartParentElement.childNodes.length === this.viewport.currentDragComponentInfo.dragStartIndex) {
                            // 是上一次位置是最后一个, 而且父元素有多个元素
                            this.viewport.currentDragComponentInfo.dragStartParentElement.appendChild(event.item)
                        } else {
                            // 不是最后一个, 而且有多个元素
                            // 插入到它下一个元素的前一个
                            this.viewport.currentDragComponentInfo.dragStartParentElement.insertBefore(event.item, this.viewport.currentDragComponentInfo.dragStartParentElement.childNodes[this.viewport.currentDragComponentInfo.dragStartIndex])
                        }

                        // 设置新增时拖拽源信息
                        this.setDragTargetInfo(mapUniqueKey, event.newIndex as number)
                        break

                    case 'combo':
                        this.addComboComponentBySource(mapUniqueKey, this.viewport.currentDragComponentInfo.comboInfo.source, event.newIndex as number)
                        // TODO 发布新增组合事件
                        // this.props.viewport.saveOperate({
                        //     type: 'addCombo',
                        //     mapUniqueKey,
                        //     addCombo: {
                        //         parentMapUniqueKey: this.props.mapUniqueKey,
                        //         index: event.newIndex as number,
                        //         componentInfo: component
                        //     }
                        // })
                        break
                }
            },
            onUpdate: (event: any) => {
                // // 同一个父级下子元素交换父级
                // // 取消 srotable 对 dom 的修改, 让元素回到最初的位置即可复原
                const oldIndex = event.oldIndex as number
                const newIndex = event.newIndex as number
                if (this.viewport.currentDragComponentInfo.dragStartParentElement.childNodes.length === oldIndex + 1) {
                    // 是从最后一个元素开始拖拽的
                    this.viewport.currentDragComponentInfo.dragStartParentElement.appendChild(event.item)
                } else {
                    if (newIndex > oldIndex) {
                        // 如果移到了后面
                        this.viewport.currentDragComponentInfo.dragStartParentElement.insertBefore(event.item, this.viewport.currentDragComponentInfo.dragStartParentElement.childNodes[oldIndex])
                    } else {
                        // 如果移到了前面
                        this.viewport.currentDragComponentInfo.dragStartParentElement.insertBefore(event.item, this.viewport.currentDragComponentInfo.dragStartParentElement.childNodes[oldIndex + 1])
                    }
                }
                this.horizontalMoveComponent(mapUniqueKey, event.oldIndex as number, event.newIndex as number)

                // TODO 保存历史
                // this.props.viewport.saveOperate({
                //     type: 'exchange',
                //     mapUniqueKey: this.props.mapUniqueKey,
                //     exchange: {
                //         oldIndex,
                //         newIndex
                //     }
                // })
            },
            onRemove: (event: any) => {
                // onEnd 在其之后执行，会清除拖拽目标的信息
                // 减少了一个子元素，一定是发生在 viewport 区域元素发生跨父级拖拽时
                this.moveComponent(mapUniqueKey, this.viewport.currentDragComponentInfo.dragStartIndex, this.viewport.currentDragComponentInfo.viewportInfo.targetMapUniqueKey, this.viewport.currentDragComponentInfo.viewportInfo.targetIndex)

                // 一个元素被跨父级移动，生命周期执行顺序是： 新位置的 didMount -> 原来位置的 willUnmount -> 执行这个方法
                // onEnd 是最后执行，所以不用担心拖拽中间数据被清除
                // 因此在这里修正位置最好
                // 触发一个事件
                this.eventAction.emit(`${this.event.viewportDomUpdate}.${this.viewport.currentDragComponentInfo.viewportInfo.mapUniqueKey}`)

                // 触发 move 事件
                // this.props.viewport.saveOperate({
                //     type: 'move',
                //     // 新增元素父级 key
                //     mapUniqueKey: this.props.mapUniqueKey,
                //     move: {
                //         targetParentMapUniqueKey: this.props.viewport.dragTargetMapUniqueKey,
                //         targetIndex: this.props.viewport.dragTargetIndex,
                //         sourceParentMapUniqueKey: this.props.mapUniqueKey,
                //         sourceIndex: event.oldIndex as number
                //     }
                // })
            }
        }, sortableParam))
    }

    /**
     * 子元素外部拖动
     * 拖动的元素会拷贝一份在视图中，自身不会减少，可以做拖拽菜单
     * 如果子元素有 data-unique-key 属性，则会创建一个新元素
     * 如果子元素有 data-source 属性，则会创建一个组合
     */
    registerOuterDrag(dragParentElement: HTMLElement, groupName = 'gaea-can-drag-in') {
        // 上次拖拽的位置
        let lastDragStartIndex = -1

        Sortable.create(dragParentElement, {
            animation: 150,
            // 放在一个组里,可以跨组拖拽
            group: {
                name: groupName,
                pull: 'clone',
                put: false
            },
            sort: false,
            delay: 0,
            onStart: (event: any) => {
                lastDragStartIndex = event.oldIndex as number

                if (event.item.dataset.source) {
                    this.startDrag({
                        type: 'combo',
                        dragStartParentElement: dragParentElement,
                        dragStartIndex: event.oldIndex as number,
                        comboInfo: {
                            source: event.item.dataset.source
                        }
                    })
                } else if (event.item.dataset.uniqueKey) {
                    this.startDrag({
                        type: 'new',
                        dragStartParentElement: dragParentElement,
                        dragStartIndex: event.oldIndex as number,
                        newInfo: {
                            uniqueKey: event.item.dataset.uniqueKey
                        }
                    })
                }
            },
            onEnd: (event: any) => {
                this.endDrag()
                // 因为是 clone 方式, 拖拽成功的话元素会重复, 没成功拖拽会被添加到末尾
                // 所以先移除 clone 的元素（吐槽下, 拖走的才是真的, 留下的才是 clone 的）
                // 有 parentNode, 说明拖拽完毕还是没有被清除, 说明被拖走了, 因为如果没真正拖动成功, clone 元素会被删除
                if (event.clone.parentNode) {
                    // 有 clone, 说明已经真正拖走了
                    dragParentElement.removeChild(event.clone)
                    // 再把真正移过去的弄回来
                    if (lastDragStartIndex === dragParentElement.childNodes.length) {
                        // 如果拖拽的是最后一个
                        dragParentElement.appendChild(event.item)
                    } else {
                        // 拖拽的不是最后一个
                        dragParentElement.insertBefore(event.item, dragParentElement.childNodes[lastDragStartIndex])
                    }
                } else {
                    // 没拖走, 只是晃了一下, 不用管了
                }
            }
        })
    }

    /**
     * 获取某个组件全部子元素 mapUniqueKey 数组
     */
    getAllChildsByMapUniqueKey(mapUniqueKey: string) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)
        let childMapUniqueKeys = componentInfo.layoutChilds || []
        // 找到其子组件
        componentInfo.layoutChilds && componentInfo.layoutChilds.forEach(childMapUniqueKey => {
            const childNestMapUniqueKeys = this.getAllChildsByMapUniqueKey(childMapUniqueKey)
            if (childNestMapUniqueKeys.length > 0) {
                childMapUniqueKeys = childMapUniqueKeys.concat(...childNestMapUniqueKeys)
            }
        })
        return childMapUniqueKeys
    }

    /**
     * 获取当前编辑组件的属性值
     */
    getCurrentEditPropValueByEditInfo(editInfo: FitGaea.ComponentPropsGaeaEdit) {
        if (!editInfo || !this.viewport.currentEditComponentMapUniqueKey) {
            return ''
        }

        const value = _.get(this.viewport.currentEditComponentInfo.props, editInfo.field)

        if (value === null || value === undefined || value === editInfo.emptyValue) {
            return ''
        }
        return value.toString()
    }

    /**
     * 获取增量编辑信息
     */
    getIncrementComponentsInfo() {
        // 获取 components 的 map, 但是要把 options 中除了 value 以外字段都干掉
        const cloneComponents = JSON.parse(JSON.stringify(this.viewport.components))

        Object.keys(cloneComponents).map(key => {
            cloneComponents[key] = this.applicationAction.cleanComponent(cloneComponents[key])
        })

        return LZString.compressToBase64(JSON.stringify(cloneComponents))
    }

    /**
     * 获取一个已存在组件的完整信息, 返回的是一个新对象, 不用担心引用问题
     */
    getComponentFullInfoByMapUniqueKey(mapUniqueKey: string): FitGaea.ViewportComponentFullInfo {
        const componentInfo = this.viewport.components.get(mapUniqueKey)

        // 子元素信息
        let childs: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
        } = {}

        const mapChilds = (component: FitGaea.ViewportComponentInfo, childs: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
        }) => {
            if (component.props.canDragIn && component.layoutChilds) {
                JSON.parse(JSON.stringify(component.layoutChilds)).forEach((componentMapUniqueKey: string) => {
                    const childInfo = this.viewport.components.get(componentMapUniqueKey)
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
     * 返回一个新的复制对象, 把所有 mapUniqueKey 都换成新的, 但引用关系保持不变
     */
    createCopyComponentWithNewUniqueKey(originComponent: FitGaea.ViewportComponentFullInfo, parentMapUniqueKey: string) {
        // 保持父子级引用关系不变, 重新生成 mapUniqueKey
        // [oldMapUniqueKey => newMapUniqueKey]
        const uniqueKeyMap = new Map()
        uniqueKeyMap.set(originComponent.mapUniqueKey, this.createUniqueKey())

        originComponent.childs && Object.keys(originComponent.childs).forEach(childMapUniqueKey => {
            uniqueKeyMap.set(childMapUniqueKey, this.createUniqueKey())
        })

        // 更新 childs 的 mapUniqueKey
        let childs: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
        } = {}

        Object.keys(originComponent.childs).forEach(mapUniqueKey => {
            const originChild = originComponent.childs[mapUniqueKey]

            childs[uniqueKeyMap.get(mapUniqueKey)] = {
                parentMapUniqueKey: uniqueKeyMap.get(originChild.parentMapUniqueKey),
                props: JSON.parse(JSON.stringify(originChild.props))
            }

            if (originChild.layoutChilds) {
                childs[uniqueKeyMap.get(mapUniqueKey)].layoutChilds = originChild.layoutChilds.map(childMapUniqueKey => uniqueKeyMap.get(childMapUniqueKey))
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
            newCopyComponent.componentInfo.layoutChilds = originComponent.componentInfo.layoutChilds.map(childMapUniqueKey => uniqueKeyMap.get(childMapUniqueKey))
        }

        return newCopyComponent
    }

    /**
     * 注册函数处理中间件
     */
    middlewareRegister(viewportFunctionName: string, func: any) {
        if (!this.viewport.middleware.has(viewportFunctionName)) {
            this.viewport.middleware.set(viewportFunctionName, [func])
        } else {
            const funcs = this.viewport.middleware.get(viewportFunctionName)
            this.viewport.middleware.set(viewportFunctionName, funcs.concat(func))
        }
    }
}