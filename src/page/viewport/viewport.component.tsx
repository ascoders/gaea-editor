import * as classNames from "classnames"
import { Connect } from "dob-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { StoreProps } from "../../stores"
import EditHelper from "./edit-helper/edit-helper.component"
import * as Styled from "./viewport.style"

class Props extends StoreProps<void, void> {

}

class State {

}

@Connect
export default class Viewport extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

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

    public render() {
        if (this.props.stores.ViewportStore.rootInstanceKey === null) {
            return null
        }

        return (
            <Styled.Container onMouseLeave={this.handleMouseLeave} ref={this.getRef}>
                <EditHelper key={this.props.stores.ViewportStore.rootInstanceKey} instanceKey={this.props.stores.ViewportStore.rootInstanceKey} />
            </Styled.Container>
        )
    }
}
