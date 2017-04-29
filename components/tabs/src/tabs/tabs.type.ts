import * as React from "react"

export class Props {
  public defaultActiveKey?: string | number = null
  public activeKey?: string | number = null
  public onChange?: (key?: string | number) => void
}

export class State {
  public activeKey?: string | number
  public moveBarStyle?: React.CSSProperties = {}
  public isForward?: boolean = false
}
