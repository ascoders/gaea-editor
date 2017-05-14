import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom";
import Icon from "../../../components/icon/src"
import { Input } from "../../../components/input/src"
import { Select } from "../../../components/select/src"
import { TabPanel, Tabs } from "../../../components/tabs/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

const selects: any = {
  defaultValue: "aa",
  options: [{
    key: "a",
    value: "小明"
  }, {
    key: "b",
    value: "小红"
  }, {
    key: "c",
    value: "小白"
  }, {
    key: "d",
    value: "小王"
  }, {
    key: "e",
    value: "小李"
  }, {
    groupValue: "其它",
    children: [{
      key: "aa",
      value: "小黑"
    }, {
      key: "bb",
      value: "小天"
    }]
  }]
}

@Connect
class PageAddFolder extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  private pageInfo: IPage = null

  public render() {
    this.pageInfo = this.props.stores.ApplicationStore.currentEditPage

    if (!this.pageInfo) {
      return
    }

    return (
      <Styled.Container>
        <Styled.Title >
          <Styled.TitleLeftContainer>
            <span>
              {this.props.stores.ApplicationStore.currentCreatedPageKey ? "添加文件夹" : "编辑文件夹"}
            </span>
            {this.props.stores.ApplicationStore.currentCreatedPageKey !== this.props.stores.ApplicationStore.currentEditPageKey &&
              <Styled.RemoveButtonContainer onClick={this.handleRemove}>
                <Icon type="remove" size={16} />
              </Styled.RemoveButtonContainer>
            }
          </Styled.TitleLeftContainer>
          <Styled.CloseContainer onClick={this.handleCloseRightBar}>
            <Icon type="close" size={15} />
          </Styled.CloseContainer>
        </Styled.Title>

        <Styled.FormTitle>名称</Styled.FormTitle>
        <Input value={this.pageInfo.name} onChange={this.handleChangeName} />

        <Styled.FormTitle>路径名</Styled.FormTitle>
        <Input value={this.pageInfo.path} onChange={this.handleChangePath} />

        <Styled.FormTitle>父级文件夹</Styled.FormTitle>
        <Select {...selects} />

        {this.props.stores.ApplicationStore.currentCreatedPageKey &&
          <Styled.Button onClick={this.handleCreate}>
            创建
          </Styled.Button>
        }
      </Styled.Container>
    )
  }

  private handleCloseRightBar = () => {
    this.props.actions.ApplicationAction.RemoveCreatingPage()

    this.props.actions.ApplicationAction.setRightTool(null)
  }

  private handleChangeName = (value: string) => {
    this.props.actions.ApplicationAction.changePageName(this.props.stores.ApplicationStore.currentEditPageKey, value)
  }

  private handleChangePath = (value: string) => {
    this.props.actions.ApplicationAction.changePagePath(this.props.stores.ApplicationStore.currentEditPageKey, value)
  }

  private handleCreate = () => {
    this.props.actions.ApplicationAction.confirmCreatePage()
    this.props.actions.ApplicationAction.setRightTool(null)
  }

  private handleRemove = () => {
    this.props.actions.ApplicationAction.removePage(this.props.stores.ApplicationStore.currentEditPageKey)
    this.props.actions.ApplicationAction.setRightTool(null)
  }
}

export default {
  position: "toolContainerRightAddFolder",
  class: PageAddFolder
}
