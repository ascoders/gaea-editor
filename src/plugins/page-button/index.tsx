import { Connect } from "dob-react"
import * as React from "react"
import Icon from "../../components/icon/src"
import { Tooltip } from "../../components/tooltip/src"
import { StoreProps } from "../../stores"
import * as Styled from "./style"

export class Props extends StoreProps<void, void> {

}

export class State {

}

@Connect
class PageButton extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    public render() {
        return (
            <Tooltip title="配置页面">
                <Styled.Container onClick={this.handleClick} theme={{ active: this.props.stores.ApplicationStore.leftTool === "page" }}>
                    <Icon type="page" />
                </Styled.Container>
            </Tooltip>
        )
    }

    private handleClick = () => {
        if (this.props.stores.ApplicationStore.leftTool !== "page") {
            this.props.actions.ApplicationAction.setLeftTool("page")
            this.props.actions.ApplicationAction.setRightTool(null)
        } else {
            this.props.actions.ApplicationAction.setLeftTool(null)
            this.props.actions.ApplicationAction.setRightTool(null)
        }
    }
}

export default {
    position: "leftBarTop",
    class: PageButton
}
