import { Connect } from "dob-react"
import * as React from "react"
import { StoreProps } from "../../stores"
import * as store from "./store"
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
            <Styled.Container>
                全局设置
            </Styled.Container>
        )
    }
}

export default {
    position: "navbarLeft",
    class: GlobalSetting,
    actions: {
        GlobalSettingAction: store.GlobalSettingsAction
    },
    stores: {
        GlobalSettingsStore: store.GlobalSettingsStore
    }
}
