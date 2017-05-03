import { Connect } from "dynamic-react"
import * as React from "react"
import { TabPanel, Tabs } from "../../../components/tabs/src/"
import { StoreProps } from "../../stores"
import * as Styled from "./index.style"

export class Props extends StoreProps<void, void> { }
export class State { }

@Connect
class MainTool extends React.Component<Props,
State> {
  public static defaultProps = new Props()
  public state = new State()

  public render() {
    return (
      <Styled.Container>
        <Tabs defaultActiveKey="components">
          <TabPanel tab="组件" activeKey="components">
            {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolComponent")}
          </TabPanel>
          <TabPanel tab="编辑" activeKey="edit">
            {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolEdit")}
          </TabPanel>
          <TabPanel tab="树图" activeKey="tree">
            {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolTree")}
          </TabPanel>
          <TabPanel tab="版本" activeKey="version">
            {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolVersion")}
          </TabPanel>
        </Tabs>
      </Styled.Container>
    )
  }
}

export default {
  position: "mainTool",
  class: MainTool
}
