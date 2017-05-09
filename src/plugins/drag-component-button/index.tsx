import { Connect } from "dynamic-react"
import * as React from "react"
import { StoreProps } from "../../stores"
import * as Styled from "./style"

export class Props extends StoreProps<void, void> {

}

export class State {

}

@Connect
class GlobalSetting extends React.Component<Props, State> {
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
        this.props.actions.ApplicationAction.setIsShowLeftTool(!this.props.stores.ApplicationStore.isShowLeftTool)
    }
}

export default {
    position: "leftBarTop",
    class: GlobalSetting
}
