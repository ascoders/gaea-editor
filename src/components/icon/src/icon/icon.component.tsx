import * as classNames from "classnames"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Styled from "./icon.style"
import * as typings from "./icon.type"

import add from "../icons/add"
import addFile from "../icons/add-file"
import addFolder from "../icons/add-folder"
import close from "../icons/close"
import component from "../icons/component"
import database from "../icons/database"
import edit from "../icons/edit"
import file from "../icons/file"
import folder from "../icons/folder"
import keybroad from "../icons/keybroad"
import page from "../icons/page"
import remove from "../icons/remove"
import rightArrow from "../icons/right-arrow"
import setting from "../icons/setting"
import trash from "../icons/trash"

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
iconMap.set("trash", trash)
iconMap.set("add", add)
iconMap.set("keybroad", keybroad)
iconMap.set("database", database)
iconMap.set("rightArrow", rightArrow)
iconMap.set("edit", edit)

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
