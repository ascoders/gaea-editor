import { Connect } from "dynamic-react"
import * as React from "react"
import { TabPanel, Tabs } from "../../../components/tabs/src/"
import { StoreProps } from "../../stores"

export class Props extends StoreProps { }
export class State { }

@Connect
class MainToolComponent extends React.Component<Props,
State> {
  public static defaultProps = new Props()
  public state = new State()

  public getList = () => {
    return Array.from(this.props.stores.ApplicationStore.componentClasses).map(([key, componentClass], index) => {
      return (
        <div key={index}>{componentClass.defaultProps.gaeaSetting.name}</div>
      )
    })
  }

  public render() {
    return (
      <div>{this.getList()}</div>
    )
  }
}

export default {
  position: "mainToolComponent",
  class: MainToolComponent
}
