import { Connect } from "dynamic-react"
import * as React from "react"
import { TabPanel, Tabs } from "../../../components/tabs/src/"
import { StoreProps } from "../../stores"

export class Props extends StoreProps { }
export class State { }

@Connect
class MainTool extends React.Component<Props,
State> {
  public static defaultProps = new Props()
  public state = new State()

  public render() {
    return (
      <div>
        <Tabs defaultActiveKey="components">
          <TabPanel tab="组件" activeKey="components">
            {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolComponent")}
          </TabPanel>
          <TabPanel tab="版本" activeKey="version">
            {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolVersion")}
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default {
  position: "mainToolTop",
  class: MainTool
}
