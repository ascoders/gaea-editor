import { observe } from "dob"
import { Connect } from "dob-react"
import * as React from "react"
import { TabPanel, Tabs } from "../../components/tabs/src/"
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
          <TabPanel tab="编辑" activeKey="editor">
            {this.props.actions.ApplicationAction.loadPluginByPosition("mainToolEditor")}
          </TabPanel>
          <TabPanel tab="树图" activeKey="tree">
            {this.props.actions.ApplicationAction.loadPluginByPosition("mainToolTree")}
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
