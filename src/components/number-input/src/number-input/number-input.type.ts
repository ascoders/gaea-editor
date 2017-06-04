import * as React from "react"

export class Props {
  public value?: number | string
  public onChange?: (value?: number) => void
  public disabled?: boolean = false
  public onClick?: (event?: React.FormEvent<HTMLInputElement>) => void
  public placeholder?: string
  public style?: React.CSSProperties = {}

  public max?: number = Infinity
  public min?: number = -Infinity
}

export class State {

}
