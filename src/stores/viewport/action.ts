import { inject } from "dependency-inject"
import { Action } from "dynamic-object"
import * as _ from "lodash"
import * as Sortable from "sortablejs"
import ApplicationStore from "../application/store"
import ViewportStore from "./store"

/**
 * gaeaKey 指组件 class 防止重复的 props.gaeaSetting.key
 * instanceKey 是 viewport 给每个组件实例的唯一标识
 */

export default class ViewportAction {
    @inject(ViewportStore)
    private store: ViewportStore

    @inject(ApplicationStore)
    private applicationStore: ApplicationStore

    /**
     * 设置视图区域 dom 对象
     */
    @Action public setViewportDOM(dom: HTMLElement) {
        this.store.viewportDOM = dom
    }

    /**
     * 生成唯一的 instance key
     */
    @Action public createNewInstanceKey() {
        return _.uniqueId("gaea_instance_")
    }

    /**
     * 设置根节点的 instance key
     */
    @Action public setRootInstanceKey(key: string) {
        this.store.rootInstanceKey = key
    }

    /**
     * Add new instance to viewport
     */
    @Action public addInstance(gaeaKey: string, parentInstanceKey: string, indexPosition: number) {
        const newInstanceKey = this.createNewInstanceKey()

        this.store.instances.set(newInstanceKey, {
            gaeaKey,
            data: {},
            childs: [],
            parentInstanceKey
        })

        // add instanceKey to parent instance's childs
        if (parentInstanceKey !== null) {
            const parentInstance = this.store.instances.get(parentInstanceKey)
            parentInstance.childs.splice(indexPosition, 0, newInstanceKey)

            // 如果父级和自身都是 gaea-container，且父级是 display:flex，那么子元素默认 flexDirection 与父级元素相反
            if (parentInstance.gaeaKey === "gaea-container" && gaeaKey === "gaea-container") {
                if (this.getInstanceProps(parentInstanceKey, "style.display") === "flex" &&
                    this.getInstanceProps(newInstanceKey, "style.display") === "flex") {
                    switch (this.getInstanceProps(parentInstanceKey, "style.flexDirection")) {
                        case "column":
                            this.setInstanceProps(newInstanceKey, "style.flexDirection", "row")
                            break
                        case "row":
                        default:
                            this.setInstanceProps(newInstanceKey, "style.flexDirection", "column")
                    }
                }
            }

        }

        return newInstanceKey
    }

    @Action public moveInstance(sourceTargetKey: string, targetParentKey: string, targetIndex: number) {
        const sourceTargetInstance = this.store.instances.get(sourceTargetKey)
        const sourceParentInstance = this.store.instances.get(sourceTargetInstance.parentInstanceKey)
        const targetParentInstance = this.store.instances.get(targetParentKey)

        if (sourceTargetInstance.parentInstanceKey !== targetParentKey) { // 跨越层级
            // 修改拖拽元素的 parentMapUniqueKey
            sourceTargetInstance.parentInstanceKey = targetParentKey

            // 拖拽目标添加 instance
            targetParentInstance.childs.splice(targetIndex, 0, sourceTargetKey)

            // 拖拽源删除 instance
            sourceParentInstance.childs = sourceParentInstance.childs.filter(childKey => childKey !== sourceTargetKey)
        } else {  // 同层级
            this.horizontalMoveInstance(targetParentKey, sourceParentInstance.childs.findIndex(childKey => childKey === sourceTargetKey), targetIndex)
        }
    }

    /**
     * 同层级拖拽，不需要主动调用，直接调用 moveInstance 即可
     */
    @Action public horizontalMoveInstance(parentKey: string, beforeIndex: number, afterIndex: number) {
        const parentInstance = this.store.instances.get(parentKey)
        if (beforeIndex < afterIndex) {
            // 从左到右
            for (let index = beforeIndex; index < afterIndex; index++) {
                const beforeUniqueKey = parentInstance.childs[index]
                const afterUniqueKey = parentInstance.childs[index + 1]
                parentInstance.childs[index] = afterUniqueKey
                parentInstance.childs[index + 1] = beforeUniqueKey
            }
        } else {
            // 从右到左
            for (let index = beforeIndex; index > afterIndex; index--) {
                const beforeUniqueKey = parentInstance.childs[index]
                const afterUniqueKey = parentInstance.childs[index - 1]
                parentInstance.childs[index] = afterUniqueKey
                parentInstance.childs[index - 1] = beforeUniqueKey
            }
        }
    }

    @Action public removeInstance(reomveInstanceKey: string) {
        const removeInstance = this.store.instances.get(reomveInstanceKey)

        // 根节点无法删除
        if (removeInstance.parentInstanceKey === null) {
            throw Error("不能删除根节点")
        }

        // 删除这个组件的子组件
        const childKeys = this.getAllChilds(reomveInstanceKey)
        childKeys.forEach(childKey => {
            this.store.instances.delete(childKey)
        })

        // 找到被删除组件的父组件
        const parentInstance = this.store.instances.get(removeInstance.parentInstanceKey)
        // 从父组件的孩子节点列表中移除
        parentInstance.childs = parentInstance.childs.filter(childKey => childKey !== reomveInstanceKey)

        // 将组件自身从 store 中删除
        this.store.instances.delete(reomveInstanceKey)

        // 如果要删除的组件就是正在编辑的组件，退出编辑状态
        if (reomveInstanceKey === this.store.currentEditInstanceKey) {
            this.setCurrentEditInstanceKey(null)
        }
        // 如果要删除的组件就是正在 hover 的组件，退出编辑状态
        if (reomveInstanceKey === this.store.currentHoverInstanceKey) {
            this.setCurrentHoverInstanceKey(null)
        }
    }

    /**
     * 设置实例的 props 属性
     */
    @Action public setInstanceProps(instanceKey: string, key: string, value: any) {
        const instance = this.store.instances.get(instanceKey)
        const instanceClass = this.applicationStore.componentClasses.get(instance.gaeaKey)

        // 如果和 defaultProps 相同，就把字段置空
        if (value === (instanceClass.defaultProps as any)[key]) {
            delete instance.data.props[key]
            return
        }

        _.set(instance.data, `props.${key}`, value)
    }

    /**
     * 获得实例 props 属性，如果没有设置，选择 defaultProps 中属性
     */
    @Action public getInstanceProps(instanceKey: string, key: string) {
        const instance = this.store.instances.get(instanceKey)
        const instanceClass = this.applicationStore.componentClasses.get(instance.gaeaKey)

        // 如果不存在，选择 defaultProps 中的属性
        if (!_.has(instance.data, `props.${key}`)) {
            return _.get(instanceClass.defaultProps, key)
        }

        return _.get(instance.data, `props.${key}`)
    }

    /**
     * 获取某个组件全部子元素 mapUniqueKey 数组
     */
    @Action public getAllChilds(instanceKey: string) {
        const instance = this.store.instances.get(instanceKey)
        let childKeys = instance.childs || []
        // 找到其子组件
        if (instance.childs) {
            instance.childs.forEach(childKey => {
                const childNestMapUniqueKeys = this.getAllChilds(childKey)
                if (childNestMapUniqueKeys.length > 0) {
                    childKeys = childKeys.concat(...childNestMapUniqueKeys)
                }
            })
        }
        return childKeys
    }

    /**
     *  设置当前 hover 元素的 instanceKey
     */
    @Action public setCurrentHoverInstanceKey(instanceKey: string) {
        this.store.currentHoverInstanceKey = instanceKey
    }

    /**
     * 设置当前 edit 元素的 instanceKey
     */
    @Action public setCurrentEditInstanceKey(instanceKey: string) {
        // 如果和当前正在编辑元素相同，不做操作
        if (this.store.currentEditInstanceKey === instanceKey) {
            return
        }

        // 修改 mapUniqueKey
        this.store.currentEditInstanceKey = instanceKey
    }

    @Action public startDrag(dragInfo: IDragInfo) {
        this.store.currentDragInfo = dragInfo
    }

    @Action public endDrag() {
        this.store.currentDragInfo = null
    }

    /**
     * 从视图中移动到新父级时，设置拖拽信息
     */
    @Action public setDragInfo(mapUniqueKey: string, index: number) {
        const newInfo = this.store.currentDragInfo.info as IDragInfoNew
        newInfo.targetInstanceKey = mapUniqueKey
        newInfo.targetIndex = index
    }

    /**
     * 递归找到节点到根实例的路径
     */
    @Action public getInstancePath(instanceKey: string) {
        const finderPath: string[] = [this.store.currentEditInstanceKey]

        if (this.store.currentEditInstanceKey === null) {
            return [] as string[]
        }

        let instance = this.store.instances.get(this.store.currentEditInstanceKey)

        // 如果已经是根元素, 直接返回空数组
        if (instance.parentInstanceKey === null) {
            return [this.store.rootInstanceKey]
        }

        // 直到父级是根元素为止
        while (this.store.instances.get(instance.parentInstanceKey).parentInstanceKey !== null) {
            finderPath.unshift(instance.parentInstanceKey)
            instance = this.store.instances.get(instance.parentInstanceKey)
        }

        finderPath.unshift(this.store.rootInstanceKey)

        return finderPath
    }

    /**
     * 设置 instance 的 dom 节点
     */
    @Action public setDomInstance(instanceKey: string, dom: HTMLElement) {
        this.store.instanceDoms.set(instanceKey, dom)
    }

    /**
     * 注册子元素内部拖动
     * 指的是当前元素与视图元素一一对应，拖拽相当于视图元素的拖拽，可以实现例如 treePlugin
     */
    @Action public registerInnerDrag(parentInstanceKey: string, dragParentDom: HTMLElement, params: any) {
        const instance = this.store.instances.get(parentInstanceKey)

        Sortable.create(dragParentDom, {
            ...params,
            animation: 150,
            // 放在一个组里,可以跨组拖拽
            group: {
                name: "gaea-container",
                pull: true,
                put: true
            },
            onStart: (event: any) => {
                this.startDrag({
                    type: "viewport",
                    dragStartParentDom: dragParentDom,
                    dragStartIndex: event.oldIndex as number,
                    info: {
                        instanceKey: instance.childs[event.oldIndex as number]
                    }
                })
            },
            onEnd: (event: any) => {
                this.endDrag()

                // 在 viewport 中元素拖拽完毕后, 为了防止 outer-move-box 在原来位置留下残影, 先隐藏掉
                this.setCurrentHoverInstanceKey(null)
            },
            onAdd: (event: any) => {
                switch (this.store.currentDragInfo.type) {
                    case "new":
                        // 是新拖进来的, 不用管, 因为工具栏会把它收回去
                        // 为什么不删掉? 因为这个元素不论是不是 clone, 都被移过来了, 不还回去 react 在更新 dom 时会无法找到
                        const newInfo = this.store.currentDragInfo.info as IDragInfoNew
                        const newInstanceKey = this.addInstance(newInfo.gaeaKey, parentInstanceKey, event.newIndex as number)
                        break

                    case "viewport":
                        // 这里只还原 dom，和记录拖拽源信息，不会修改 components 数据，跨层级移动在 remove 回调中修改
                        // 是从视图区域另一个元素移过来，而且是新增的, 而不是同一个父级改变排序
                        // 把这个元素还给之前拖拽的父级
                        if (this.store.currentDragInfo.dragStartParentDom.childNodes.length === 0) {
                            // 之前只有一个元素
                            this.store.currentDragInfo.dragStartParentDom.appendChild(event.item)
                        } else if (this.store.currentDragInfo.dragStartParentDom.childNodes.length === this.store.currentDragInfo.dragStartIndex) {
                            // 是上一次位置是最后一个, 而且父元素有多个元素
                            this.store.currentDragInfo.dragStartParentDom.appendChild(event.item)
                        } else {
                            // 不是最后一个, 而且有多个元素
                            // 插入到它下一个元素的前一个
                            this.store.currentDragInfo.dragStartParentDom.insertBefore(event.item, this.store.currentDragInfo.dragStartParentDom.childNodes[this.store.currentDragInfo.dragStartIndex])
                        }

                        // 设置新增时拖拽源信息
                        this.setDragInfo(parentInstanceKey, event.newIndex as number)
                        break

                    case "combo":
                        // this.addComboComponentBySource(mapUniqueKey, this.viewport.currentDragComponentInfo.comboInfo.source, event.newIndex as number)
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

                if (this.store.currentDragInfo.dragStartParentDom.childNodes.length === oldIndex + 1) {
                    // 是从最后一个元素开始拖拽的
                    this.store.currentDragInfo.dragStartParentDom.appendChild(event.item)
                } else {
                    if (newIndex > oldIndex) {
                        // 如果移到了后面
                        this.store.currentDragInfo.dragStartParentDom.insertBefore(event.item, this.store.currentDragInfo.dragStartParentDom.childNodes[oldIndex])
                    } else {
                        // 如果移到了前面
                        this.store.currentDragInfo.dragStartParentDom.insertBefore(event.item, this.store.currentDragInfo.dragStartParentDom.childNodes[oldIndex + 1])
                    }
                }

                this.horizontalMoveInstance(parentInstanceKey, event.oldIndex as number, event.newIndex as number)

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
                const dragTargetKey = this.store.instances.get(parentInstanceKey).childs[this.store.currentDragInfo.dragStartIndex]
                const dragViewportInfo = this.store.currentDragInfo.info as IDragInfoViewport
                this.moveInstance(dragTargetKey, dragViewportInfo.targetInstanceKey, dragViewportInfo.targetIndex)

                // 一个元素被跨父级移动，生命周期执行顺序是： 新位置的 didMount -> 原来位置的 willUnmount -> 执行这个方法
                // onEnd 是最后执行，所以不用担心拖拽中间数据被清除
                // 因此在这里修正位置最好
                // 触发一个事件
                // this.eventAction.emit(`${this.event.viewportDomUpdate}.${this.viewport.currentDragComponentInfo.viewportInfo.mapUniqueKey}`)
            }
        })
    }

    /**
     * 子元素外部拖动
     * 拖动的元素会拷贝一份在视图中，自身不会减少，可以做拖拽菜单
     * 如果子元素有 data-unique-key 属性，则会创建一个新元素
     * 如果子元素有 data-source 属性，则会创建一个组合
     */
    @Action public registerOuterDrag(dragParentDom: HTMLElement) {
        // 上次拖拽的位置
        let lastDragStartIndex = -1

        Sortable.create(dragParentDom, {
            animation: 150,
            // 放在一个组里,可以跨组拖拽
            group: {
                name: "gaea-container",
                pull: "clone",
                put: false
            },
            sort: false,
            delay: 0,
            onStart: (event: any) => {
                lastDragStartIndex = event.oldIndex as number

                if (event.item.dataset.source) {
                    // this.startDrag({
                    //     type: 'combo',
                    //     dragStartParentElement: dragParentDom,
                    //     dragStartIndex: event.oldIndex as number,
                    //     comboInfo: {
                    //         source: event.item.dataset.source
                    //     }
                    // })
                } else if (event.item.dataset.gaeaKey) {
                    this.startDrag({
                        type: "new",
                        dragStartParentDom: dragParentDom,
                        dragStartIndex: event.oldIndex as number,
                        info: {
                            gaeaKey: event.item.dataset.gaeaKey
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
                    dragParentDom.removeChild(event.clone)
                    // 再把真正移过去的弄回来
                    if (lastDragStartIndex === dragParentDom.childNodes.length) {
                        // 如果拖拽的是最后一个
                        dragParentDom.appendChild(event.item)
                    } else {
                        // 拖拽的不是最后一个
                        dragParentDom.insertBefore(event.item, dragParentDom.childNodes[lastDragStartIndex])
                    }
                } else {
                    // 没拖走, 只是晃了一下, 不用管了
                }
            }
        })
    }
}
