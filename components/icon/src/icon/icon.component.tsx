import * as classNames from "classnames"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Styled from "./icon.style"
import * as typings from "./icon.type"

import addFile from "../icons/add-file"
import addFolder from "../icons/add-folder"
import close from "../icons/close"
import component from "../icons/component"
import file from "../icons/file"
import folder from "../icons/folder"
import page from "../icons/page"
import remove from "../icons/remove"
import setting from "../icons/setting"

const iconMap = new Map<string, (size: number) => React.ReactElement<any>>()
iconMap.set("close", close)
iconMap.set("page", page)
iconMap.set("component", component)
iconMap.set("folder", folder)
iconMap.set("file", file)
iconMap.set("addFile", addFile)
iconMap.set("addFolder", addFolder)
iconMap.set("setting", setting)
iconMap.set("remove", remove)

export class Icon extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public render() {
    return (
      <Styled.Container>
        {iconMap.get(this.props.type)(this.props.size)}
      </Styled.Container>
    )
  }
}
