import { Connect } from "dynamic-react"
import * as React from "react"

import { StoreProps } from "../../stores"
import * as store from "./store"

export class Props extends StoreProps {

}

export class State {

}

@Connect
class GlobalSetting extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    public render() {
        return (
            <div>
                全局设置
            </div>
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
