import { Connect } from "dob-react"
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
        this.props.actions.EventAction.emit(this.props.stores.EventStore.emitEditorCallback, {
            funcName: "onSave",
            data: this.props.actions.ApplicationAction.getFullInformationGzipped()
        })
    }
}

export default {
    position: "navbarRight",
    class: Save
}
