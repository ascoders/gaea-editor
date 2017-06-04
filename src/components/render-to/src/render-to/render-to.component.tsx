import * as React from "react"
import * as ReactDOM from "react-dom"
import { Props, State } from "./render-to.type"

export class RenderTo extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  private popups: HTMLElement[]
  private selectorLength: number

  public componentDidMount() {
    this.popups = []
    const selector = document.querySelectorAll(this.props.selector)
    Array.prototype.slice.call(selector).forEach((parent: HTMLElement) => {
      const popup = document.createElement("div")
      parent.appendChild(popup)
      this.popups.push(popup)
    })

    this.renderLayer()
    this.selectorLength = selector.length
  }

  public componentDidUpdate() {
    this.renderLayer()
  }

  public componentWillUnmount() {
    this.popups.forEach(popup => {
      ReactDOM.unmountComponentAtNode(popup)
    })
    const selector = document.querySelectorAll(this.props.selector)

    if (selector.length !== this.selectorLength) {
      throw Error("selector amount had been changed!")
    }

    Array.prototype.slice.call(document.querySelectorAll(this.props.selector)).forEach((parent: HTMLElement) => {
      const popup = this.popups.shift()
      parent.removeChild(popup)
    })
  }

  public render(): any {
    return null
  }

  private renderLayer = () => {
    this.popups.forEach(popup => {
      ReactDOM.render(this.props.children as React.ReactElement<any>, popup)
    })
  }
}
