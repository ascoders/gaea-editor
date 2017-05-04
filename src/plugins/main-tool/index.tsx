import { observe } from "dynamic-object"
import { Connect } from "dynamic-react"
import * as React from "react"
import { TabPanel, Tabs } from "../../../components/tabs/src/"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class MainTool extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public componentDidMount() {
    observe(() => {
      if (this.props.stores.ViewportStore.currentEditInstanceKey) {
        this.props.actions.ViewportAction.setCurrentHoverInstanceKey(null)

        this.setState({
          activeKey: "editor"
        })
      }
    })
  }

  public handleChange = (activeKey: string) => {
    this.setState({
      activeKey
    })
  }

  public render() {
    return (
      <Styled.Container>
        <Tabs activeKey={this.state.activeKey} onChange={this.handleChange}>
          <TabPanel tab="组件" activeKey="components">
            {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolComponent")}
          </TabPanel>
          <TabPanel tab="编辑" activeKey="editor">
            {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolEditor")}
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
