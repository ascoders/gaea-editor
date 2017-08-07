import { Connect } from "dob-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { BoxEditor } from "../../components/box-editor/src/"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class MainToolEditorColor extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo

  public render() {
    if (!this.props.stores.ViewportStore.instances.has(this.props.stores.ViewportStore.currentEditInstanceKey)) {
      return null
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(this.props.stores.ViewportStore.currentEditInstanceKey)

    const style: React.CSSProperties = this.props.actions.ViewportAction.getInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, "style") || {}

    return (
      <Styled.Container>
        <BoxEditor
          onStart={this.handleStart}
          marginLeft={style.marginLeft}
          marginTop={style.marginTop}
          marginRight={style.marginRight}
          marginBottom={style.marginBottom}
          paddingLeft={style.paddingLeft}
          paddingTop={style.paddingTop}
          paddingRight={style.paddingRight}
          paddingBottom={style.paddingBottom}
          onChange={this.handleChange}
          onFinalChange={this.handleFinalChange}
        />
      </Styled.Container>
    )
  }

  private handleStart = () => {
    //
  }

  private handleChange = (name: string, value: number) => {
    this.props.actions.ViewportAction.setInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, `style.${name}`, value)
  }

  private handleFinalChange = (name: string, value: number) => {
    //
  }
}

export default {
  position: "mainToolEditorTypeBoxEditor",
  class: MainToolEditorColor
}
