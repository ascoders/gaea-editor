import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom";
import { TabPanel, Tabs } from "../../../components/tabs/src/"
import { StoreProps } from "../../stores"
import * as Styled from "./index.style"

export class Props extends StoreProps { }
export class State { }

@Connect
class MainToolComponent extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public componentDidMount() {
    this.props.actions.ViewportAction.registerOuterDrag(ReactDOM.findDOMNode(this) as HTMLElement)
  }

  public getList = () => {
    return Array.from(this.props.stores.ApplicationStore.componentClasses).map(([key, componentClass], index) => {
      return (
        <Styled.Component
          key={index}
          data-gaea-key={componentClass.defaultProps.gaeaSetting.key}
        >{componentClass.defaultProps.gaeaSetting.name}</Styled.Component>
      )
    })
  }

  public render() {
    return (
      <Styled.Container>{this.getList()}</Styled.Container>
    )
  }
}

export default {
  position: "mainToolComponent",
  class: MainToolComponent
}
