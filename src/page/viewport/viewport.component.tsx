import * as classNames from "classnames"
import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { StoreProps } from "../../stores"
import EditHelper from "./edit-helper/edit-helper.component"
import * as Styled from "./viewport.style"

class Props extends StoreProps {

}

class State {

}

import {

} from "./viewport.style"

@Connect
export default class Viewport extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    public componentWillMount() {
        this.freshView()
    }

    /**
     * 获取自己的实例
     */
    public getRef = (ref: React.ReactInstance) => {
        this.props.actions.ViewportAction.setViewportDOM(ReactDOM.findDOMNode(ref) as HTMLElement)
    }

    /**
     * 鼠标移开视图区域
     */
    public handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()

        // 触发事件
        this.props.actions.EventAction.emit(this.props.stores.EventStore.mouseLeaveViewport)

        // 设置当前 hover 的元素为 null
        this.props.actions.ViewportAction.setCurrentHoverInstanceKey(null)
    }

    /**
     * 刷新视图
     */
    public freshView() {
        if (this.props.stores.ApplicationStore.defaultValue === null) {  // 空白应用
            const RootClass = this.props.actions.ApplicationAction.getComponentClassByKey("gaea-container")

            const rootInstanceKey = this.props.actions.ViewportAction.addInstance("gaea-container", null, null)

            this.props.actions.ViewportAction.setRootInstanceKey(rootInstanceKey)

            // 设置根节点属性
            this.props.actions.ViewportAction.setInstanceProps(rootInstanceKey, "style", {
                display: "flex",
                flexGrow: 1,
                flexDirection: "column"
            })
        } else { // 根据默认配置渲染
            // const defaultValue = JSON.parse(LZString.decompressFromBase64(this.props.ApplicationStore.pageValue)) as {
            //     [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
            // }

            // Object.keys(defaultValue).forEach(mapUniqueKey => {
            //     const defaultInfo = defaultValue[mapUniqueKey]
            //     const ComponentClass = this.props.ApplicationAction.getComponentClassByGaeaUniqueKey(defaultInfo.props.gaeaUniqueKey)

            //     // 如果是根节点, 设置根据点 id
            //     if (defaultInfo.parentMapUniqueKey === null) {
            //         this.props.ViewportAction.setRootMapUniqueKey(mapUniqueKey)
            //     }

            //     const props = _.merge(_.cloneDeep(ComponentClass.defaultProps), defaultInfo.props || {})

            //     this.props.ViewportAction.setComponent(mapUniqueKey, {
            //         props: props,
            //         layoutChilds: defaultInfo.layoutChilds || [],
            //         parentMapUniqueKey: defaultInfo.parentMapUniqueKey
            //     })
            // })
        }
    }

    public render() {
        // if (this.props.stores.ApplicationStore.defaultValue === null) {
        //     return null
        // }

        const classes = classNames({
            // _namespace: true,
            // 'layout-active': this.props.ViewportStore.isLayoutComponentActive
        })

        return (
            <Styled.Container onMouseLeave={this.handleMouseLeave} ref={this.getRef}>
                <EditHelper instanceKey={this.props.stores.ViewportStore.rootInstanceKey} />
            </Styled.Container>
        )
    }
}
