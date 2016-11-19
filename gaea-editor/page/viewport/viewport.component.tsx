import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './viewport.type'
import * as classNames from 'classnames'
import {observer} from 'mobx-react'
import * as LZString from 'lz-string'

import {autoBindMethod} from '../../../../../common/auto-bind/index'

import EditHelper from './edit-helper/edit-helper.component'

import ViewportAction from '../../actions/viewport'
import EventAction from '../../actions/event'
import ApplicationAction from '../../actions/application'
import {lazyInject} from '../../utils/kernel'

import './viewport.scss'

@observer(['viewport', 'event', 'application'])
export default class Viewport extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @lazyInject(ApplicationAction) private applicationAction: ApplicationAction
    @lazyInject(EventAction) private eventAction: EventAction
    @lazyInject(ViewportAction) private viewportAction: ViewportAction

    componentWillMount() {
        if (this.props.application.pageValue === 'empty') {
            // 还没有初始化
            return
        }

        if (this.props.application.pageValue === null) {  // 空白应用
            // 生成根节点唯一 id
            const rootMapUniqueKey = this.viewportAction.createUniqueKey()
            this.viewportAction.setRootMapUniqueKey(rootMapUniqueKey)

            // 获得根节点类
            const RootClass = this.applicationAction.getComponentClassByGaeaUniqueKey(this.props.application.editorProps.rootLayoutComponentUniqueKey)

            // 设置根节点属性
            let rootProps = _.cloneDeep(RootClass.defaultProps)
            rootProps.style.backgroundColor = 'white'

            if (this.props.application.editorProps.isReactNative) {
                rootProps.style.flex = 1
                rootProps.style.overflowY = 'auto'
                rootProps.style.flexDirection = 'column'
            } else {
                rootProps.style.flexGrow = 1
                rootProps.style.flexDirection = 'column'
                rootProps.style.display = 'block'
                rootProps.style.overflow = null
                rootProps.style.overflowX = 'hidden'
                rootProps.style.overflowY = 'auto'
            }

            this.viewportAction.setComponent(this.props.viewport.rootMapUniqueKey, {
                props: rootProps,
                layoutChilds: [],
                parentMapUniqueKey: null
            })
        } else { // 根据默认配置渲染
            const defaultValue = JSON.parse(LZString.decompressFromBase64(this.props.application.pageValue)) as {
                [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
            }

            Object.keys(defaultValue).forEach(mapUniqueKey => {
                const defaultInfo = defaultValue[mapUniqueKey]
                const ComponentClass = this.applicationAction.getComponentClassByGaeaUniqueKey(defaultInfo.props.gaeaUniqueKey)

                // 如果是根节点, 设置根据点 id
                if (defaultInfo.parentMapUniqueKey === null) {
                    this.viewportAction.setRootMapUniqueKey(mapUniqueKey)
                }

                const props = _.merge(_.cloneDeep(ComponentClass.defaultProps), defaultInfo.props || {})

                this.viewportAction.setComponent(mapUniqueKey, {
                    props: props,
                    layoutChilds: defaultInfo.layoutChilds || [],
                    parentMapUniqueKey: defaultInfo.parentMapUniqueKey
                })
            })
        }
    }

    componentDidMount() {

    }

    /**
     * 获取自己的实例
     */
    @autoBindMethod getRootRef(ref: React.ReactInstance) {
        this.viewportAction.setViewportDom(ReactDOM.findDOMNode(ref) as HTMLElement)
    }

    /**
     * 鼠标移开视图区域
     */
    @autoBindMethod handleMouseLeave(event: React.MouseEvent) {
        event.stopPropagation()

        // 触发事件
        this.eventAction.emit(this.props.event.mouseLeaveViewport)

        // 设置当前 hover 的元素为 null
        this.viewportAction.setCurrentHoverComponentMapUniqueKey(null)
    }

    render() {
        if (this.props.application.pageValue === 'empty') {
            return null
        }

        const classes = classNames({
            '_namespace': true,
            'layout-active': this.props.viewport.isLayoutComponentActive
        })

        return (
            <div className={classes}
                 onMouseLeave={this.handleMouseLeave}
                 ref={this.getRootRef}>
                <EditHelper mapUniqueKey={this.props.viewport.rootMapUniqueKey}/>
            </div>
        )
    }
}