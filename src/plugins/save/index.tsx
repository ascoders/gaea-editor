import { Connect } from "dynamic-react"
import * as React from "react"
import { Props, State } from "./index.type"
import * as Styled from "./style"

@Connect
class Save extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    public render() {
        return (
            <Styled.Container onClick={this.handleClick}>
                保存
            </Styled.Container>
        )
    }

    private handleClick = () => {
        //
    }
}

export default {
    position: "navbarRight",
    class: Save
}
