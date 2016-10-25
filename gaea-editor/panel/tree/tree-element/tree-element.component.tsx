import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './tree-element.type'
import {observer, inject} from 'mobx-react'
import * as classNames from 'classnames'

import {TreeNode} from '../../../../../../web-common/tree/index'
import {autoBindMethod} from '../../../../../../common/auto-bind/index'
import * as Sortable from 'sortablejs'

import './tree-element.scss'

@inject('viewport', 'application') @observer
export default class TreeElement extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 装饰器给外部用挺方便,这个专门给自己用 ^_^
    static ObserveTreeElement = inject('application', 'viewport')(observer(TreeElement))

    // 对应 store 中的数据
    private componentInfo: FitGaea.ViewportComponentInfo

    // 元素对象
    private selfInstance: React.ReactInstance
    // 元素dom对象
    private selfDomInstance: Element

    // sortable 对象, 只有布局组件才有
    private sortable: any

    componentWillMount() {
        // 从 store 找到自己信息
        this.componentInfo = this.props.viewport.components.get(this.props.mapUniqueKey)
    }

    componentDidMount() {
        this.selfDomInstance = ReactDOM.findDOMNode(this.selfInstance)

        // 如果自己是布局元素, 给子元素绑定 sortable
        if (this.componentInfo.props.canDragIn) {
            // 真实的装 children 的元素
            const dragChildrenInstance = this.selfDomInstance.querySelector('.children')

            // 添加可排序拖拽
            this.sortable = Sortable.create(dragChildrenInstance, {
                animation: 150,
                // 放在一个组里,可以跨组拖拽
                group: {
                    name: 'gaea-can-drag-in-tree',
                    pull: true,
                    put: true
                },
                onStart: (event: any) => {
                    this.props.viewport.startDragging(this.componentInfo.layoutChilds[event.oldIndex as number], '', false, dragChildrenInstance, event.oldIndex as number)
                },
                onEnd: (event: any) => {
                    this.props.viewport.endDragging()

                    // 在 viewport 中元素拖拽完毕后, 为了防止 outer-move-box 在原来位置留下残影, 先隐藏掉
                    this.props.viewport.setLeaveHover()
                    this.props.viewport.setTreeLeaveHover()
                },
                onAdd: (event: any)=> {
                    // 增加一个元素
                    const {mapUniqueKey, component} = this.props.viewport.addComponent(this.props.mapUniqueKey, event.newIndex as number)

                    // 取消 srotable 对 dom 的修改
                    // 删掉 dom 元素, 让 react 去生成 dom
                    if (this.props.viewport.currentMovingComponent.isNew) {
                        // 是新拖进来的, 不用管, 因为工具栏会把它收回去
                        // 为什么不删掉? 因为这个元素不论是不是 clone, 都被移过来了, 不还回去 react 在更新 dom 时会无法找到
                        // 记录新增历史
                        if (this.props.viewport.currentMovingComponent.uniqueKey === 'combo') {
                            // 新增组合
                            this.props.viewport.saveOperate({
                                type: 'addCombo',
                                mapUniqueKey,
                                addCombo: {
                                    parentMapUniqueKey: this.props.mapUniqueKey,
                                    index: event.newIndex as number,
                                    componentInfo: component
                                }
                            })
                        } else if (this.props.viewport.currentMovingComponent.uniqueKey === 'source') {
                            // 新增自由模板
                            this.props.viewport.saveOperate({
                                type: 'addSource',
                                mapUniqueKey,
                                addSource: {
                                    parentMapUniqueKey: this.props.mapUniqueKey,
                                    index: event.newIndex as number,
                                    componentInfo: component
                                }
                            })
                        } else {
                            // 新增普通组件
                            this.props.viewport.saveOperate({
                                type: 'add',
                                mapUniqueKey,
                                add: {
                                    uniqueId: this.props.viewport.currentMovingComponent.uniqueKey,
                                    parentMapUniqueKey: this.props.mapUniqueKey,
                                    index: event.newIndex as number
                                }
                            })
                        }

                    } else {
                        // 如果是从某个元素移过来的（新增的,而不是同一个父级改变排序）
                        // 把这个元素还给之前拖拽的父级
                        if (this.props.viewport.dragStartParentElement.childNodes.length === 0) {
                            // 之前只有一个元素
                            this.props.viewport.dragStartParentElement.appendChild(event.item)
                        } else if (this.props.viewport.dragStartParentElement.childNodes.length === this.props.viewport.dragStartIndex) {
                            // 是上一次位置是最后一个, 而且父元素有多个元素
                            this.props.viewport.dragStartParentElement.appendChild(event.item)
                        } else {
                            // 不是最后一个, 而且有多个元素
                            // 插入到它下一个元素的前一个
                            this.props.viewport.dragStartParentElement.insertBefore(event.item, this.props.viewport.dragStartParentElement.childNodes[this.props.viewport.dragStartIndex])
                        }

                        // 设置新增时拖拽源信息
                        this.props.viewport.setDragTarget(this.props.mapUniqueKey, event.newIndex as number)
                    }
                },
                onUpdate: (event: any)=> {
                    // 同一个父级下子元素交换父级
                    // 取消 srotable 对 dom 的修改, 让元素回到最初的位置即可复原
                    const oldIndex = event.oldIndex as number
                    const newIndex = event.newIndex as number

                    if (this.props.viewport.dragStartParentElement.childNodes.length === oldIndex + 1) {
                        // 是从最后一个元素开始拖拽的
                        this.props.viewport.dragStartParentElement.appendChild(event.item)
                    } else {
                        if (newIndex > oldIndex) {
                            // 如果移到了后面
                            this.props.viewport.dragStartParentElement.insertBefore(event.item, this.props.viewport.dragStartParentElement.childNodes[oldIndex])
                        } else {
                            // 如果移到了前面
                            this.props.viewport.dragStartParentElement.insertBefore(event.item, this.props.viewport.dragStartParentElement.childNodes[oldIndex + 1])
                        }
                    }
                    this.props.viewport.sortComponents(this.props.mapUniqueKey, event.oldIndex as number, event.newIndex as number)

                    this.props.viewport.saveOperate({
                        type: 'exchange',
                        mapUniqueKey: this.props.mapUniqueKey,
                        exchange: {
                            oldIndex,
                            newIndex
                        }
                    })
                },
                onRemove: (event: any)=> {
                    // 减少了一个子元素
                    this.componentInfo.layoutChilds.splice(event.oldIndex as number, 1)

                    // 新增历史纪录
                    this.props.viewport.saveOperate({
                        type: 'move',
                        // 新增元素父级 key
                        mapUniqueKey: this.props.mapUniqueKey,
                        move: {
                            targetParentMapUniqueKey: this.props.viewport.dragTargetMapUniqueKey,
                            targetIndex: this.props.viewport.dragTargetIndex,
                            sourceParentMapUniqueKey: this.props.mapUniqueKey,
                            sourceIndex: event.oldIndex as number
                        }
                    })

                    this.props.viewport.setDragTarget(null, -1)
                }
            })
        }
    }

    /**
     * 返回当前 dom 对象
     */
    public getDomInstance() {
        return this.selfDomInstance
    }

    /**
     * 渲染 treeNode 的 title
     */
    @autoBindMethod treeNameRender() {
        // 如果有事件，显示出标识
        let eventTag: React.ReactElement<any>
        if (this.componentInfo.props.gaeaEventData.length > 0) {
            eventTag = (
                <i className="event-container fa fa-bolt"/>
            )
        }

        // 如果 uniqueKey 中有 gaea, 说明是内置组件, 用背景加深方式展现
        if (this.componentInfo.props.gaeaUniqueKey.indexOf('gaea') > -1) {
            return (
                <div className="flex">
                    <i className={`fa fa-${this.componentInfo.props.gaeaIcon} icons gaea`}/>
                    <span className="text">{this.componentInfo.props.gaeaName}</span>
                    {eventTag}
                </div>
            )
        } else {
            return (
                <div className="flex">
                    <i className={`fa fa-${this.componentInfo.props.gaeaIcon} icons`}/>
                    <span className="text">{this.componentInfo.props.gaeaName}</span>
                    {eventTag}
                </div>
            )
        }
    }

    /**
     * 鼠标移上去
     */
    @autoBindMethod handleMouseOver(event: React.MouseEvent) {
        event.stopPropagation()
        this.props.application.event.emit(this.props.application.event.viewportOrTreeComponentMouseOver, {
            mapUniqueKey: this.props.mapUniqueKey,
            type: 'tree'
        } as FitGaea.MouseHoverComponentEvent)
        this.props.viewport.setHoveringComponentMapUniqueKey(this.props.mapUniqueKey)
    }

    /**
     * 最外层 鼠标移开
     */
    @autoBindMethod handleMouseLeave(event: React.MouseEvent) {
        event.stopPropagation()
        this.props.application.event.emit(this.props.application.event.viewportOrTreeRootComponentMouseLeave, {
            mapUniqueKey: this.props.mapUniqueKey,
            type: 'tree'
        } as FitGaea.MouseHoverComponentEvent)
        this.props.viewport.setHoveringComponentMapUniqueKey(null)
    }

    /**
     * 让树视图高亮框移动到自己身上
     */
    @autoBindMethod outerMoveBoxToSelf() {
        this.props.viewport.setHoverTreeComponent(this.selfDomInstance)
    }

    /**
     * 点击树后触发
     */
    @autoBindMethod handleClick() {
        event.stopPropagation()

        // 设置选中组件的 uniqueKey
        this.props.viewport.setCurrentEditComponentMapUniqueKey(this.props.mapUniqueKey)

        // 把上一个组件触发非选中
        if (this.props.viewport.lastSelectMapUniqueKey !== null) {
            // 如果上个选中组件没被关
            this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
                mapUniqueKey: this.props.viewport.lastSelectMapUniqueKey,
                selected: false
            } as FitGaea.ComponentSelectStatusEvent)
        }

        // 设置自己为上一个组件
        this.props.viewport.setLastSelectMapUniqueKey(this.props.mapUniqueKey)

        // 触发选中组件 event, 各 layout 会接收, 设置子组件的 setSelect
        this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
            mapUniqueKey: this.props.mapUniqueKey,
            selected: true
        } as FitGaea.ComponentSelectStatusEvent)
    }

    /**
     * 修改自己选中状态
     */
    @autoBindMethod setSelect(selected: boolean) {
        this.setState({
            selected
        })
    }

    render() {
        // 渲染后的结果
        let resultElement: React.ReactElement<any>
        // 子元素
        let childs: Array<React.ReactElement<any>> = null

        if (this.componentInfo.props.canDragIn && this.componentInfo.layoutChilds) {
            childs = this.componentInfo.layoutChilds.map(layoutChildUniqueMapKey=> {
                return (
                    <TreeElement.ObserveTreeElement key={layoutChildUniqueMapKey}
                                                    mapUniqueKey={layoutChildUniqueMapKey}
                                                    ref={`tree-${layoutChildUniqueMapKey}`}/>
                )
            })
        }

        let childProps = {
            render: this.treeNameRender,
            defaultExpendAll: true,
            toggleByArrow: true,
            onMouseOver: this.handleMouseOver,
            onClick: this.handleClick,
            ref: (ref: React.ReactInstance)=> {
                this.selfInstance = ref
            },
            className: classNames({
                '_namespace': true,
                'selected': this.state.selected
            }),
            // 父级是布局组件才有
            onMouseLeave: this.componentInfo.props.canDragIn ? this.handleMouseLeave : null,
            // 主动绑定用到的数据
            name: this.componentInfo.props.name,
            icon: this.componentInfo.props.icon
        }

        resultElement = React.createElement(TreeNode, childProps, childs)

        return resultElement
    }
}