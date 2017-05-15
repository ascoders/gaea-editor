import * as classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Input } from "../../../input/src"
import { RenderTo } from "../../../render-to/src"
import { Tooltip } from "../../../tooltip/src"
import { OptionGroup } from "../option-group/option-group.component"
import { Option } from "../option/option.component"
import * as Styled from "./select.style"
import * as typings from "./select.type"

export class Select extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  private dom: HTMLElement

  /**
   * 第一级选择显示的值,只有级联全路径时候使用
   */
  private firstLabelValue: string

  constructor(props: any) {
    super(props)
  }

  public componentWillMount() {
    this.setState({
      value: this.props.value !== "" ? this.props.value : this.props.defaultValue
    })
  }

  public componentWillReceiveProps(nextProps: typings.Props) {
    if (nextProps.value !== undefined) {
      this.setState({
        value: nextProps.value,
        optionKeyPrefix: nextProps.value
      })
    }

    if (nextProps.value === null) {
      this.setState({
        labelValue: ""
      })
    }
  }

  public componentDidMount() {
    this.dom = ReactDOM.findDOMNode<HTMLElement>(this)
    document.addEventListener("click", this.handleDocumentClick)
  }

  public componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick)
  }

  public render() {
    // const classes = classNames({
    //   _namespace: true,
    //   simple: this.props.simple,
    //   [this.props.className]: !!this.props.className
    // })

    let renderChosen: () => React.ReactElement<any>
    if (this.props.options.length === 0) {
      renderChosen = this.getOptionChildren
    } else {
      renderChosen = this.getOptionChildrenByOptions
    }

    const extProps: any = {}

    // 给精简模式用的额外字段
    if (this.props.simple) {
      extProps.label = ""
      extProps.placeholder = ""
    }

    // 给搜索模式用的额外字段
    if (this.props.search) {
      extProps.highlightLine = false
    }

    return (
      <Tooltip type="click" title={renderChosen} showArrow={false}>
        <Input onClick={this.handleSelectClick}
          value={this.state.labelValue}
           /*rightRender={this.dropIconRender.bind(this)}
        innerRender={renderChosen}*/ />
      </Tooltip>
    )
  }

  // 选择框点击
  private handleSelectClick = () => {
    this.setState({
      open: !this.state.open
    })
  }

  // 选择栏目点击
  private handleClick = (value: string, label: string, children?: typings.IOptions[], zIndex: number = 1) => {
    // 如果没有 children,说明是最后一级了
    if (!children) {
      let newValue = this.state.value
      const newCascader = this.state.cascader
      // 将此级后的所有级联元素删除
      let deleteEndNumber = newCascader.length - zIndex + 1
      while (deleteEndNumber > 0) {
        newCascader.pop()
        deleteEndNumber = deleteEndNumber - 1
      }

      if (zIndex === 1) {
        // 如果是第一级级联,才设置 state.value
        newValue = value
        this.firstLabelValue = label
      } else {
        // 否则设置级联元素对应项的value
        newCascader[zIndex - 2].value = value
        newCascader[zIndex - 2].labelValue = label
      }

      this.setState({
        cascader: newCascader
      })

      // 如果级联显示完整路径,修改 labelValue 的值
      let labelValue = label
      if (this.props.cascaderFull) {
        const labelValueArray = [this.firstLabelValue]
        this.state.cascader.forEach(item => {
          labelValueArray.push(item.labelValue)
        })
        labelValue = labelValueArray.join(" / ")
      }

      this.setState({
        open: false,
        value: newValue,
        labelValue
      }, () => {
        if (this.props.cascaderFull) {
          // 级联显示完整路径
          const pathArray = [this.state.value]
          this.state.cascader.forEach(item => {
            pathArray.push(item.value)
          })
          if (typeof this.props.onChange === "function") {
            this.props.onChange(pathArray)
          }
        } else {
          if (typeof this.props.onChange === "function") {
            this.props.onChange(value)
          }
        }
      })
    } else {
      // 有 children,说明还有级联, zIndex 表示级联层级,最外层是 1,那么第一层级联就是 2
      const newCascader = this.state.cascader

      if (zIndex === 1) {
        // 如果是第一级级联,设置 state.value
        this.firstLabelValue = label
        this.setState({
          value
        })
      } else {
        // 否则设置级联元素对应项的value
        newCascader[zIndex - 2].value = value
        newCascader[zIndex - 2].labelValue = label
        this.setState({
          cascader: newCascader
        })
      }

      // 因为点击选项,但后面还有,因此没点完,将labelValue设置为空
      this.setState({
        labelValue: ""
      })

      // 在级联后追加
      if (newCascader.length === zIndex - 1) {
        newCascader.push({
          value: "",
          options: children
        })
      } else {
        // 改写已有级联,删除后面的数组
        newCascader[zIndex - 1] = {
          value,
          options: children
        }
        // 先有级联层级比当前 zIndex 大多少,全都 pop 掉
        let deleteEndNumber = newCascader.length - zIndex
        while (deleteEndNumber > 0) {
          newCascader.pop()
          deleteEndNumber = deleteEndNumber - 1
        }
      }
      this.setState({
        cascader: newCascader
      })
    }
  }

  // 点击 document
  private handleDocumentClick = (event: any) => {
    if (!this.dom.contains(event.target)) {
      this.setState({
        open: false
      })
    }
  }

  // 搜索框改变
  private handleSearchChange = (value: string) => {
    this.setState({
      searchValue: value
    })
  }

  /**
   * 设置初始化labelValue
   */
  private handleSetLabelValue = (value: string, labelValue: string) => {
    this.setState({
      value,
      labelValue
    })
  }

  private getOptionChildren = () => {
    const chosenDropStyle = {
      display: this.state.open ? null : "none",
      left: 0
    }

    // 循环子元素,同时获取value,同时判断search
    const Children = React.Children.map(this.props.children, (item: React.ReactElement<any>, index: number) => {
      let active = false
      if (item.props.value === this.state.value) {
        active = true
      }

      if (_.isArray(item.props.children)) {
        item.props.children.map((childItem: React.ReactElement<any>) => {
          if (childItem.props.value === this.state.value) {
            active = true
          }
        })
      }

      return React.cloneElement(item, {
        onClick: this.handleClick,
        key: this.state.optionKeyPrefix + index,
        active,
        setLabelValue: this.handleSetLabelValue,
        activeValue: this.state.value,
        searchValue: this.state.searchValue
      })
    })

    // 搜索框
    let Search: React.ReactElement<any> = null
    if (this.props.search) {
      Search = (
        <div className="chosen-search">
          <Input placeholder="搜索.."
            ref={ref => (ReactDOM.findDOMNode(ref) as HTMLInputElement).focus()}
            onChange={this.handleSearchChange.bind(this)} />
        </div>
      )
    }

    return (
      <Styled.ChosenDrop style={chosenDropStyle}>
        {Search}
        <Styled.ChosenResults>
          {Children}
        </Styled.ChosenResults>
      </Styled.ChosenDrop>
    )
  }

  private getOptionChildrenByOptions = () => {
    const chosenDropStyle = {
      display: this.state.open ? null : "none",
      left: 0
    }

    const OptionChildren = this.props.options.map((item, index) => {
      return this.getOptionItemByType(item, index, this.state.value, 1)
    })

    // 追加渲染级联元素
    const CascaderChildrens = this.state.cascader.map((item, index) => {
      const options = item.options.map((childrenItem, childrenItemIndex) => {
        return this.getOptionItemByType(childrenItem, childrenItemIndex, item.value, index + 2)
      })
      return (
        <Styled.ChosenResults key={index}>
          {options}
        </Styled.ChosenResults>
      )
    })

    return (
      <Styled.ChosenDrop style={chosenDropStyle}>
        <div className="flex-option-container">
          <Styled.ChosenResults>
            {OptionChildren}
          </Styled.ChosenResults>
          {CascaderChildrens}
        </div>
      </Styled.ChosenDrop>
    )
  }

  /**
   * 根据一个 Option 元素类型返回对应ReactElement
   */
  private getOptionItemByType = (item: typings.IOptions, key: number, activeValue: string, zIndex: number = 1): React.ReactElement<any> => {
    if (item.groupValue) {
      // 是一个分组
      const GroupChildren = item.children.map((eachItem, index) => {
        return this.getOptionItemByType(eachItem, index, activeValue, zIndex)
      })
      return (
        <OptionGroup key={this.state.optionKeyPrefix + key}
          ignoreChildren={true}
          label={item.groupValue}>{GroupChildren}</OptionGroup>
      )
    }

    // option 元素
    let active = false
    if (item.key === activeValue) {
      active = true
    }

    return (
      <Option key={this.state.optionKeyPrefix + key}
        value={item.key}
        onClick={this.handleClick}
        active={active}
        zIndex={zIndex}
        optChildren={item.children}
        setLabelValue={this.handleSetLabelValue}
        activeValue={this.state.value}
        searchValue={this.state.searchValue}>{item.value}</Option>
    )
  }

  private dropIconRender = () => {
    const classes = classNames({
      "open": this.state.open,
      "fit-select-drop": true
    })
    return <i className={classes} />
  }
}
