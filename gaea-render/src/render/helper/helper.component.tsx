import * as _ from "lodash"
import * as React from "react"
import { Props, State } from "./helper.type"

// 根据类型生成处理函数
const parser = (type: string): (value?: string) => number | string | boolean => {
  switch (type) {
    case "number":
      return Number
    case "string":
      return (value: string) => {
        return value && value.toString()
      }
    case "boolean":
      return Boolean
  }
}

export default class RenderHelper extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  // 内部组件实例
  public wrappedInstance: React.ReactInstance

  private instanceInfo: InstanceInfo
  private componentClass: React.ComponentClass<IGaeaProps>

  // 事件数据
  private eventData: any

  public componentWillMount() {
    // 从 store 找到自己信息
    this.instanceInfo = this.props.viewport.instances.get(this.props.instanceKey)

    // 获取当前要渲染的组件 class
    this.componentClass = this.props.viewport.componentClasses.get(this.instanceInfo.gaeaKey)

    // // 执行初始化事件
    // this.eventData = this.props.viewport.isReactNative ? this.instanceInfo.props.gaeaNativeEventData : this.instanceInfo.props.gaeaEventData
    // this.eventData && this.eventData.forEach(data => {
    //   if (data.typeIndex === -1 && data.type === "init") {
    //     this.runEvent(data)
    //   }
    // })

    // // 监听事件
    // this.eventData && this.eventData.forEach(data => {
    //   if (data.typeIndex === -1 && data.type === "listen") {
    //     const listenData = data.typeData as FitGaea.EventTriggerEvent
    //     this.props.preview.customEvent.on(listenData.listen, this.handleRunEvent, data)
    //   }
    // })
  }

  public componentWillUnmount() {
    // // 取消事件监听
    // this.eventData && this.eventData.forEach(data => {
    //   if (data.typeIndex === -1 && data.type === "listen") {
    //     const listenData = data.typeData as FitGaea.EventTriggerEvent
    //     this.props.preview.customEvent.off(listenData.listen, this.handleRunEvent)
    //   }
    // })
  }

  /**
   * 监听事件执行了
   */
  public handleRunEvent = (context: any) => {
    this.runEvent(context)
  }

  /**
   * 执行事件
   */
  public runEvent = (eventData: any) => {
    // const effect = this.instanceInfo.props.gaeaEvent && this.instanceInfo.props.gaeaEvent.effects[eventData.eventIndex]
    // switch (eventData.event) {
    //   case "call":
    //     const callData = eventData.eventData as FitGaea.EventActionCall
    //     this.props.preview.event.emit(this.props.preview.event.onCall, {
    //       functionName: callData.functionName,
    //       // param: eventData.eventData
    //     })
    //     break
    //   case "jumpUrl":
    //     const jumpUrlData = eventData.eventData as FitGaea.EventActionJumpUrl
    //     location.href = jumpUrlData.url
    //     break
    //   case "emit":
    //     const emitData = eventData.eventData as FitGaea.EventActionEvent
    //     this.props.preview.customEvent.emit(emitData.emit)
    //     break
    //   case "updateProps":
    //     const updatePropsData = eventData.eventData as FitGaea.EventUpdatePropsEvent
    //     // 只修改属性
    //     this.instanceInfo.props = _.merge(_.cloneDeep(this.componentClass.defaultProps), _.cloneDeep(updatePropsData.props))
    //     this.forceUpdate()
    //     break
    // }
  }

  /**
   * 返回调用自己的方法的 key -> Array<value>
   */
  public getSelfFunctionMap = () => {
    // <string,Array<FitGaea.EventData>
    const functionMap = new Map()
    // this.eventData && this.eventData.forEach(data => {
    //   if (data.typeIndex > -1 && this.instanceInfo.props.gaeaEvent.triggers[data.typeIndex].selfCallback) {
    //     if (functionMap.has(data.type)) {
    //       const functionList = functionMap.get(data.type)
    //       functionList.push(data)
    //       functionMap.set(data.type, functionList)
    //     } else {
    //       functionMap.set(data.type, [data])
    //     }
    //   }
    // })
    return functionMap
  }

  public render() {
    // 子元素
    let childs: Array<React.ReactElement<any>> = null

    // 是否可以有子元素
    if (this.componentClass.defaultProps.gaeaSetting.isContainer && this.instanceInfo.childs) {
      childs = this.instanceInfo.childs.map(childKey => {
        return (
          <RenderHelper key={childKey}
            viewport={this.props.viewport}
            instanceKey={childKey} />
        )
      })
    }

    const props: any = {}

    // 将回调事件添加到 props 中
    // const functionMap = this.getSelfFunctionMap()
    // functionMap.forEach((value: any, key: string) => {
    //   props[key] = (...args: any[]) => {
    //     value.forEach(eachValue => {
    //       this.runEvent.apply(this, [eachValue, ...args])
    //     })
    //   }
    // })

    props.isPreview = true

    // 将变量字段替换成变量
    // props.gaeaVariables && Object.keys(props.gaeaVariables).forEach(variableField => {
    //   const variable = props.gaeaVariables[variableField]
    //   if (!variable) {
    //     // 可能还没赋值，是 null
    //     return
    //   }
    //   const myParser = parser(variable.valueType)
    //   switch (variable.variableType) {
    //     case "externalParameter":
    //       props[variableField] = this.props.preview.params[variable.variableField] ? myParser(this.props.preview.params[variable.variableField]) : null
    //       break
    //   }
    // })

    // 遍历所有字符串常量的值，如果是 ${xxx.xxx} 类型，表示使用传递变量
    Object.keys(props).forEach(propsField => {
      if (propsField.startsWith("gaea")) {
        return
      }

      try {
        props[propsField] = props[propsField].replace(/\$\{(.*)\}/g, (str: string, match: string) => {
          return _.get(this.props.gaeaData, match)
        })
      } catch (err) {
        //
      }
    })

    props.ref = (ref: React.ReactInstance) => {
      this.wrappedInstance = ref
    }

    // gaeaData 注入
    props.gaeaData = this.props.gaeaData

    // 注入 props
    _.merge(props, _.get(this.instanceInfo, "data.props") || {})

    return React.createElement(this.componentClass, props, childs)
  }
}
