export class Props {
  public gaeaSetting = {
    key: "gaea-icon",
    name: "Icon",
    editors: [
      "Layout",
      {
        text: "Box editor",
        type: "box-editor"
      },
      "Function",
      {
        field: "type",
        text: "Type",
        type: "string"
      },
      "Style",
      {
        field: "spin",
        text: "Spin",
        type: "boolean"
      }
    ]
  }

  public style: React.CSSProperties = {}
  public type: string = "search"
  public spin = false
}

export class State { }
