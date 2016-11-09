import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './edit-helper.type'
import {observer, inject} from 'mobx-react'

import {autoBindMethod} from '../../../../../../common/auto-bind/index'

import * as Sortable from 'sortablejs'

import './edit-helper.scss'

const hasClass = (obj: HTMLElement, cls: string) => {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

const removeClass = (obj: HTMLElement, cls: string) => {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        obj.className = obj.className.replace(reg, ' ')
    }
}

@observer(['application', 'viewport', 'event', 'applicationAction', 'viewportAction', 'eventAction'])
export default class EditHelper extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 暴露内层组件
    public wrappedInstance: React.ReactInstance

    // 绑定注入数据的自身 class, 递归渲染使用
    static ObserveEditHelper = inject('application', 'viewport', 'event', 'applicationAction', 'viewportAction', 'eventAction')(observer(EditHelper))

    // 当前组件的 class
    private ComponentClass: React.ComponentClass<FitGaea.ComponentProps>

    // 当前组件信息
    private componentInfo: FitGaea.ViewportComponentInfo

    // 当前组件 dom 对象
    private domInstance: HTMLElement

    // sortable 对象, 只有布局组件才有
    private sortable: any

    // 是否开始拖动
    private startDrag = false

    // 上一次拖动的 clientX clientY
    private lastClientX = null as number
    private lastClientY = null as number

    componentWillMount() {
        // 从 store 找到自己信息
        this.componentInfo = this.props.viewport.components.get(this.props.mapUniqueKey)

        // 获取当前要渲染的组件 class
        this.ComponentClass = this.props.applicationAction.getComponentClassByGaeaUniqueKey(this.componentInfo.props.gaeaUniqueKey)
    }

    componentDidMount() {
        this.domInstance = ReactDOM.findDOMNode(this.wrappedInstance) as HTMLElement

        // 绑定监听
        this.domInstance.addEventListener('mouseover', this.handleMouseOver)
        this.domInstance.addEventListener('click', this.handleClick)

        // this.domInstance.addEventListener('mousedown', this.handleMouseDown)
        // this.domInstance.addEventListener('mousemove', this.handleMouseMove)
        // this.domInstance.addEventListener('mouseup', this.handleMouseUp)

        // 增加统一 class
        this.domInstance.className += ' _namespace'

        this.setLayoutClassIfCanDragIn()

        this.setDragableClassIfNeed()

        // 存储 dom 在全局
        this.props.viewportAction.setDomInstance(this.props.mapUniqueKey, this.domInstance)

        // 如果自己是布局元素, 给子元素绑定 sortable
        if (this.componentInfo.props.canDragIn) {
            // 添加可排序拖拽
            this.sortable = Sortable.create(this.domInstance, {
                animation: 150,
                // 放在一个组里,可以跨组拖拽
                group: {
                    name: 'gaea-can-drag-in',
                    pull: true,
                    put: true
                },
                draggable: '.gaea-draggable',
                onStart: (event: any) => {
                    this.props.viewportAction.startDrag({
                        type: 'viewport',
                        dragStartParentElement: this.domInstance,
                        dragStartIndex: event.oldIndex as number,
                        viewportInfo: {
                            mapUniqueKey: this.componentInfo.layoutChilds[event.oldIndex as number]
                        }
                    })
                },
                onEnd: (event: any) => {
                    this.props.viewportAction.endDrag()

                    // 在 viewport 中元素拖拽完毕后, 为了防止 outer-move-box 在原来位置留下残影, 先隐藏掉
                    this.props.viewportAction.setCurrentHoverComponentMapUniqueKey(null)
                },
                onAdd: (event: any)=> {
                    switch (this.props.viewport.currentDragComponentInfo.type) {
                        case 'new':
                            // 是新拖进来的, 不用管, 因为工具栏会把它收回去
                            // 为什么不删掉? 因为这个元素不论是不是 clone, 都被移过来了, 不还回去 react 在更新 dom 时会无法找到
                            const mapUniqueKey = this.props.viewportAction.addNewComponent(this.props.viewport.currentDragComponentInfo.newInfo.uniqueKey, this.props.mapUniqueKey, event.newIndex as number)

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
                            if (this.props.viewport.currentDragComponentInfo.dragStartParentElement.childNodes.length === 0) {
                                // 之前只有一个元素
                                this.props.viewport.currentDragComponentInfo.dragStartParentElement.appendChild(event.item)
                            } else if (this.props.viewport.currentDragComponentInfo.dragStartParentElement.childNodes.length === this.props.viewport.currentDragComponentInfo.dragStartIndex) {
                                // 是上一次位置是最后一个, 而且父元素有多个元素
                                this.props.viewport.currentDragComponentInfo.dragStartParentElement.appendChild(event.item)
                            } else {
                                // 不是最后一个, 而且有多个元素
                                // 插入到它下一个元素的前一个
                                this.props.viewport.currentDragComponentInfo.dragStartParentElement.insertBefore(event.item, this.props.viewport.currentDragComponentInfo.dragStartParentElement.childNodes[this.props.viewport.currentDragComponentInfo.dragStartIndex])
                            }

                            // 设置新增时拖拽源信息
                            this.props.viewportAction.setDragTargetInfo(this.props.mapUniqueKey, event.newIndex as number)
                            break

                        case 'combo':
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
                onUpdate: (event: any)=> {
                    // // 同一个父级下子元素交换父级
                    // // 取消 srotable 对 dom 的修改, 让元素回到最初的位置即可复原
                    // const oldIndex = event.oldIndex as number
                    // const newIndex = event.newIndex as number
                    // if (this.props.viewport.dragStartParentElement.childNodes.length === oldIndex + 1) {
                    //     // 是从最后一个元素开始拖拽的
                    //     this.props.viewport.dragStartParentElement.appendChild(event.item)
                    // } else {
                    //     if (newIndex > oldIndex) {
                    //         // 如果移到了后面
                    //         this.props.viewport.dragStartParentElement.insertBefore(event.item, this.props.viewport.dragStartParentElement.childNodes[oldIndex])
                    //     } else {
                    //         // 如果移到了前面
                    //         this.props.viewport.dragStartParentElement.insertBefore(event.item, this.props.viewport.dragStartParentElement.childNodes[oldIndex + 1])
                    //     }
                    // }
                    // this.props.viewport.sortComponents(this.props.mapUniqueKey, event.oldIndex as number, event.newIndex as number)
                    //
                    // this.props.viewport.saveOperate({
                    //     type: 'exchange',
                    //     mapUniqueKey: this.props.mapUniqueKey,
                    //     exchange: {
                    //         oldIndex,
                    //         newIndex
                    //     }
                    // })
                },
                onRemove: (event: any)=> {
                    // 减少了一个子元素，一定是发生在 viewport 区域元素发生跨父级拖拽时
                    this.props.viewportAction.moveComponent(this.props.mapUniqueKey, this.props.viewport.currentDragComponentInfo.dragStartIndex, this.props.viewport.currentDragComponentInfo.viewportInfo.targetMapUniqueKey, this.props.viewport.currentDragComponentInfo.viewportInfo.targetIndex)

                    // 这时减少的那个子元素 dom 被销毁新建了，重新刷新视图中此 dom
                    //this.props.viewportAction.setDomInstance(this.props.viewport.currentDragComponentInfo)

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

                    // onEnd 在其之后执行，会清除拖拽目标的信息
                }
            })
        }
    }

    componentWillUpdate(nextProps: typings.PropsDefine, nextState: typings
        .StateDefine) {
        this.setLayoutClassIfCanDragIn()
        this.setDragableClassIfNeed()
    }

    componentWillUnmount() {
        // 移除事件绑定
        this.domInstance.removeEventListener('mouseover', this.handleMouseOver)
        this.domInstance.removeEventListener('click', this.handleClick)

        // 在全局移除自身 dom 实例
        this.props.viewportAction.removeDomInstance(this.props.mapUniqueKey)
    }

    /**
     * 如果是 absolute 布局，加上 absolute class
     */
    setDragableClassIfNeed() {
        // 给绝对定位元素增加 absolute class，避免 sortable 响应
        if (this.componentInfo.props.style.position !== 'absolute' && !hasClass(this.domInstance, 'gaea-draggable')) {
            this.domInstance.className += ' gaea-draggable'
        } else if (this.componentInfo.props.style.position === 'absolute' && hasClass(this.domInstance, 'gaea-draggable')) {
            removeClass(this.domInstance, 'gaea-draggable')
        }
    }

    /**
     * 如果是布局容器，添加 class
     */
    @autoBindMethod setLayoutClassIfCanDragIn() {
        if (this.componentInfo.props.canDragIn && this.componentInfo.parentMapUniqueKey !== null) {
            if (!hasClass(this.domInstance, 'gaea-layout')) {
                this.domInstance.className += ' gaea-layout'
            }
        }
    }

    /**
     * 鼠标移上去
     */
    @autoBindMethod handleMouseOver(event: MouseEvent) {
        event.stopPropagation()

        // 触发事件
        this.props.eventAction.emit(this.props.event.mouseHoveringComponent, {
            mapUniqueKey: this.props.mapUniqueKey,
            type: 'component'
        }as FitGaea.MouseHoverComponentEvent)

        this.props.viewportAction.setCurrentHoverComponentMapUniqueKey(this.props.mapUniqueKey)
    }

    /**
     * 让树视图高亮框移动到自己身上
     */
    @autoBindMethod outerMoveBoxToSelf() {
        // TODO
        // this.props.viewport.setHoverComponent(this.domInstance)
    }

    @autoBindMethod handleClick(event: MouseEvent) {
        event.stopPropagation()

        // 将当前组件设置为正在编辑状态
        this.props.viewportAction.setCurrentEditComponentMapUniqueKey(this.props.mapUniqueKey)
    }

    /**
     * :TODO 绝对定位移动
     */
    @autoBindMethod handleMouseDown(event: MouseEvent) {
        event.preventDefault()

        if (this.componentInfo.props.style.position === 'gaea-draggable') {
            return
        }

        this.startDrag = true
        //this.props.viewport.setIsMovingComponent(true)
        //this.props.viewport.prepareWriteHistory(this.props.mapUniqueKey)
    }

    @autoBindMethod handleMouseMove(event: MouseEvent) {
        event.preventDefault()

        if (this.componentInfo.props.style.position === 'gaea-draggable') {
            return
        }

        if (!this.startDrag) {
            return
        }

        // 拖动的元素一定是 absolute 的，直接修改位置
        const diffX = this.lastClientX === null ? 0 : event.clientX - this.lastClientX
        const diffY = this.lastClientY === null ? 0 : event.clientY - this.lastClientY

        this.lastClientX = event.clientX
        this.lastClientY = event.clientY

        //this.props.viewport.updateAbsoluteXY(this.props.mapUniqueKey, diffX, diffY)
        //this.props.viewport.setIsMovingComponent(false)
    }

    @autoBindMethod handleMouseUp(event: MouseEvent) {
        event.preventDefault()

        if (this.componentInfo.props.style.position === 'gaea-draggable') {
            return
        }

        this.startDrag = false
        this.lastClientX = null as number
        this.lastClientY = null as number
        //this.props.viewport.writeHistory(this.props.mapUniqueKey)
    }

    render() {
        // 子元素
        let childs: Array<React.ReactElement<any>> = null

        // 布局元素可以有子元素
        if (this.componentInfo.props.canDragIn && this.componentInfo.layoutChilds) {
            childs = this.componentInfo.layoutChilds.map(layoutChildUniqueMapKey=> {
                return (
                    <EditHelper.ObserveEditHelper key={layoutChildUniqueMapKey}
                                                  mapUniqueKey={layoutChildUniqueMapKey}
                                                  ref={`edit-${layoutChildUniqueMapKey}`}/>
                )
            })
        }

        let componentProps = JSON.parse(JSON.stringify(this.componentInfo.props))

        componentProps.ref = (ref: React.ReactInstance)=> {
            this.wrappedInstance = ref
        }

        componentProps.gaeaPreview = false

        return React.createElement(this.ComponentClass, componentProps, childs)
    }
}