import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './edit-helper.type'
import {observer, inject} from 'mobx-react'

import {autoBindMethod} from 'nt-auto-bind'

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

@observer(['ApplicationStore', 'ViewportStore', 'EventStore', 'ApplicationAction', 'EventAction', 'ViewportAction'])
export default class EditHelper extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 暴露内层组件
    public wrappedInstance: React.ReactInstance

    // 绑定注入数据的自身 class, 递归渲染使用
    static ObserveEditHelper = inject('ApplicationStore', 'ViewportStore', 'EventStore', 'ApplicationAction', 'EventAction', 'ViewportAction')(observer(EditHelper))

    // 当前组件的 class
    private ComponentClass: React.ComponentClass<FitGaea.ComponentProps>

    // 当前组件信息
    private componentInfo: FitGaea.ViewportComponentInfo

    // 当前组件 dom 对象
    private domInstance: HTMLElement

    // 是否开始拖动
    private startDrag = false

    // 上一次拖动的 clientX clientY
    private lastClientX = null as number
    private lastClientY = null as number

    componentWillMount() {
        // 从 store 找到自己信息
        this.componentInfo = this.props.ViewportStore.components.get(this.props.mapUniqueKey)

        // 获取当前要渲染的组件 class
        this.ComponentClass = this.props.ApplicationAction.getComponentClassByGaeaUniqueKey(this.componentInfo.props.gaeaUniqueKey)
    }

    componentDidMount() {
        this.domInstance = ReactDOM.findDOMNode(this.wrappedInstance) as HTMLElement

        // 绑定监听
        this.domInstance.addEventListener('mouseover', this.handleMouseOver)
        this.domInstance.addEventListener('click', this.handleClick)

        this.props.EventAction.on(`${this.props.EventStore.viewportDomUpdate}.${this.props.mapUniqueKey}`, this.updateDom)

        // this.domInstance.addEventListener('mousedown', this.handleMouseDown)
        // this.domInstance.addEventListener('mousemove', this.handleMouseMove)
        // this.domInstance.addEventListener('mouseup', this.handleMouseUp)

        // 增加统一 class
        this.domInstance.className += ' _namespace'

        this.setLayoutClassIfCanDragIn()

        this.setDragableClassIfNeed()

        // 更新 dom 信息
        this.props.ViewportAction.setDomInstance(this.props.mapUniqueKey, this.domInstance)

        // 如果自己是布局元素, 给子元素绑定 sortable
        if (this.componentInfo.props.canDragIn) {
            // 添加可排序拖拽
            this.props.ViewportAction.registerInnerDrag(this.props.mapUniqueKey, this.domInstance, 'gaea-can-drag-in', {
                draggable: '.gaea-draggable'
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

        this.props.EventAction.off(`${this.props.EventStore.viewportDomUpdate}.${this.props.mapUniqueKey}`, this.updateDom)

        // 在 dom 列表中移除
        this.props.ViewportAction.removeDomInstance(this.props.mapUniqueKey)
    }

    /**
     * 更新此元素的 dom 信息
     */
    @autoBindMethod updateDom() {
        this.props.ViewportAction.setDomInstance(this.props.mapUniqueKey, this.domInstance)
    }

    /**
     * 如果是 absolute 布局，加上 absolute class
     */
    @autoBindMethod setDragableClassIfNeed() {
        if (!this.componentInfo.props.style || !this.componentInfo.props.style.position) {
            if (!hasClass(this.domInstance, 'gaea-draggable')) {
                this.domInstance.className += ' gaea-draggable'
            }
            return
        }

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
        this.props.EventAction.emit(this.props.EventStore.mouseHoveringComponent, {
            mapUniqueKey: this.props.mapUniqueKey,
            type: 'component'
        }as FitGaea.MouseHoverComponentEvent)

        this.props.ViewportAction.setCurrentHoverComponentMapUniqueKey(this.props.mapUniqueKey)
    }

    /**
     * 让树视图高亮框移动到自己身上
     */
    @autoBindMethod outerMoveBoxToSelf() {
        // TODO
        // this.props.ViewportStore.setHoverComponent(this.domInstance)
    }

    @autoBindMethod handleClick(event: MouseEvent) {
        event.stopPropagation()

        // 将当前组件设置为正在编辑状态
        this.props.ViewportAction.setCurrentEditComponentMapUniqueKey(this.props.mapUniqueKey)
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
        //this.props.ViewportStore.setIsMovingComponent(true)
        //this.props.ViewportStore.prepareWriteHistory(this.props.mapUniqueKey)
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

        //this.props.ViewportStore.updateAbsoluteXY(this.props.mapUniqueKey, diffX, diffY)
        //this.props.ViewportStore.setIsMovingComponent(false)
    }

    @autoBindMethod handleMouseUp(event: MouseEvent) {
        event.preventDefault()

        if (this.componentInfo.props.style.position === 'gaea-draggable') {
            return
        }

        this.startDrag = false
        this.lastClientX = null as number
        this.lastClientY = null as number
        //this.props.ViewportStore.writeHistory(this.props.mapUniqueKey)
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

        // 移除 gaea 自用的属性
        delete componentProps.canDragIn
        delete componentProps.gaeaEdit
        delete componentProps.gaeaEvent
        delete componentProps.gaeaEventData
        delete componentProps.gaeaNativeEventData
        delete componentProps.gaeaUniqueKey
        delete componentProps.gaeaVariables

        componentProps.ref = (ref: React.ReactInstance)=> {
            this.wrappedInstance = ref
        }

        componentProps.gaeaPreview = false

        return React.createElement(this.ComponentClass, componentProps, childs)
    }
}