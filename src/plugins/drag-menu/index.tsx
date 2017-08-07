import { Connect } from "dob-react"
import * as React from "react"
import * as ReactDOM from "react-dom";
import Icon from "../../components/icon/src"
import { TabPanel, Tabs } from "../../components/tabs/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class DragMenu extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  private listContainer: React.ReactInstance

  public componentDidMount() {
    this.props.actions.ViewportAction.registerOuterDrag(ReactDOM.findDOMNode(this.listContainer) as HTMLElement)
  }

  public render() {
    return (
      <Styled.Container>
        <Styled.Title >
          <div>添加组件</div>
          <Styled.CloseContainer onClick={this.handleCloseLeftBar}>
            <Icon type="close" size={15} />
          </Styled.CloseContainer>
        </Styled.Title>

        <Styled.SearchInput value={this.state.searchContent} onChange={this.handleSearch} placeholder="搜索.." />

        <Styled.ListContainer ref={(ref: React.ReactInstance) => this.listContainer = ref}>
          {this.getList()}
        </Styled.ListContainer>

        {this.props.actions.ApplicationAction.loadPluginByPosition("toolContainerDragMenuList")}
      </Styled.Container>
    )
  }

  private getList = () => {
    return Array.from(this.props.stores.ApplicationStore.componentClasses)
      .filter(([gaeaKey, componentClass]) => {
        const setting = this.props.stores.ApplicationStore.componentSetting.get(gaeaKey)

        // 如果被设置为了预设组件，过滤掉
        if (Array.from(this.props.stores.ApplicationStore.preComponents.keys()).some(preGaeaKey => preGaeaKey === setting.key)) {
          return false
        }

        // 如果搜索框没有输入，展示
        if (this.state.searchContent === "") {
          return true
        }

        return new RegExp(this.state.searchContent).test(setting.name)
      })
      .map(([gaeaKey, componentClass], index) => {
        const setting = this.props.stores.ApplicationStore.componentSetting.get(gaeaKey)

        return (
          <Styled.Component
            key={"standard" + index}
            data-gaea-key={setting.key}
          >{setting.name}</Styled.Component>
        )
      })
      .concat(
      Array.from(this.props.stores.ApplicationStore.preComponents)
        .map(([gaeaKey, preComponentInfos], index) => {
          const componentClass = this.props.stores.ApplicationStore.componentClasses.get(gaeaKey)
          return Array.prototype.concat.apply([], preComponentInfos
            .filter(preComponentInfo => {
              const setting = this.props.stores.ApplicationStore.componentSetting.has(preComponentInfo.key) ? this.props.stores.ApplicationStore.componentSetting.get(preComponentInfo.key) : this.props.stores.ApplicationStore.componentSetting.get(gaeaKey)

              // 如果搜索框没有输入，展示
              if (this.state.searchContent === "") {
                return true
              }

              return new RegExp(this.state.searchContent).test(setting.name)
            })
            .map((preComponentInfo, childIndex) => {
              const setting = this.props.stores.ApplicationStore.componentSetting.has(preComponentInfo.key) ? this.props.stores.ApplicationStore.componentSetting.get(preComponentInfo.key) : this.props.stores.ApplicationStore.componentSetting.get(gaeaKey)

              return (
                <Styled.Component
                  key={"preSetting" + index + "&" + childIndex}
                  data-gaea-key={componentClass.defaultProps.gaeaSetting.key}
                  data-props={JSON.stringify(preComponentInfo.props)}
                  data-pre-gaea-key={preComponentInfo.key}
                >{setting.name}</Styled.Component>
              )
            }))
        })
      )
  }

  private handleCloseLeftBar = () => {
    this.props.actions.ApplicationAction.setLeftTool(null)
    this.props.actions.ApplicationAction.setRightTool(null)
  }

  private handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      searchContent: event.currentTarget.value as string
    })
  }
}

export default {
  position: "toolContainerLeftDragMenu",
  class: DragMenu
}
