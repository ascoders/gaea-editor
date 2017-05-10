import { Connect } from "dynamic-react"
import * as React from "react"
import { StoreProps } from "../../stores"
import * as Styled from "./style"

export class Props extends StoreProps<void, void> {

}

export class State {

}

@Connect
class DragMenuButton extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    public render() {
        return (
            <Styled.Container onClick={this.handleClick}>
                +
            </Styled.Container>
        )
    }

    private handleClick = () => {
        if (this.props.stores.ApplicationStore.leftTool === null) {
            this.props.actions.ApplicationAction.setLeftTool("dragMenu")
        } else {
            this.props.actions.ApplicationAction.setLeftTool(null)
            this.props.actions.ApplicationAction.setIsFullLeftTool(false)
        }
    }
}

export default {
    position: "leftBarTop",
    class: DragMenuButton
}
