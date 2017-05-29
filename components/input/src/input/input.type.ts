import * as React from "react"

export class Props {
  public value?: string
  public onChange?: (value?: string) => void
  public disabled?: boolean = false
  public onClick?: (event?: React.FormEvent<HTMLInputElement>) => void
  public placeholder?: string
  public style?: React.CSSProperties = {}
}

export class State {

}
