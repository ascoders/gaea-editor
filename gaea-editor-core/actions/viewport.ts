import {injectable} from 'inversify'
import {action, observable, extendObservable} from 'mobx'
import ViewportStore from '../stores/viewport'
import ApplicationAction from '../actions/application'
import {lazyInject} from '../utils/kernel'
import * as Sortable from 'sortablejs'

@injectable()
export default class ViewportAction {
    @lazyInject(ViewportStore) private viewport: ViewportStore
    @lazyInject(ApplicationAction) private applicationAction: ApplicationAction

    @action('设置根节点唯一标识') setRootMapUniqueKey(mapUniqueKey: string) {
        this.viewport.rootMapUniqueKey = mapUniqueKey
    }

    @action('在视图中设置组件信息') setComponent(mapUniqueKey: string, componentInfo: FitGaea.ViewportComponentInfo) {
        componentInfo.props = this.completionEditProps(componentInfo.props)

        if (componentInfo.parentMapUniqueKey === null) {
            // 最外层必须相对定位，不能修改
            componentInfo.props.gaeaEdit = componentInfo.props.gaeaEdit.filter((edit: any)=>edit.editor !== 'position' && edit !== '定位')
        }

        this.viewport.components.set(mapUniqueKey, extendObservable({}, componentInfo))
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

    @action('新增模板组件') addComboComponent() {
    }

    @action('移除组件') removeComponent() {

    }

    @action('设置视图区域 dom 节点') setViewportDom(dom: HTMLElement) {
        this.viewport.viewportDom = dom
    }

    @action('设置当前 hover 元素的 mapUniqueKey') setCurrentHoverComponentMapUniqueKey(mapUniqueKey: string) {
        this.viewport.currentHoverComponentMapUniqueKey = mapUniqueKey
    }

    @action('设置当前 editing 元素的 mapUniqueKey') setCurrentEditComponentMapUniqueKey(mapUniqueKey: string) {
        this.viewport.currentEditComponentMapUniqueKey = mapUniqueKey
    }

    @action('生成唯一 key') createUniqueKey() {
        return _.uniqueId('gaea-component-' + new Date().getTime() + '-')
    }

    @action('新增一个视图 dom 实例') addDomInstance(mapUniqueKey: string, dom: HTMLElement) {
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
     * 直接子元素可以被拖拽到视图区域
     * 如果子元素有 data-unique-key 属性，则会创建一个新元素
     * 如果子元素有 data-source 属性，则会创建一个组合
     */
    registerDraggable(dragParentElement: HTMLElement) {
        // 上次拖拽的位置
        let lastDragStartIndex = -1

        Sortable.create(dragParentElement, {
            animation: 150,
            // 放在一个组里,可以跨组拖拽
            group: {
                name: 'gaea-can-drag-in',
                pull: 'clone',
                put: false
            },
            sort: false,
            delay: 0,
            onStart: (event: any) => {
                lastDragStartIndex = event.oldIndex as number
                this.startDrag({
                    type: 'new',
                    dragStartParentElement: dragParentElement,
                    dragStartIndex: event.oldIndex as number,
                    newInfo: {
                        uniqueKey: event.item.dataset.uniqueKey
                    }
                })
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
}