import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './template.type'
import {observer, inject} from 'mobx-react'
import DragList from '../../../utils/drag-list'

import './template.scss'

const TWO_COLUMN = `{"name":"两列","mapUniqueKey":"gaea-component-1475912221054-2","componentInfo":{"props":{"style":{},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912210697-1","layoutChilds":["gaea-component-1475912222125-3","gaea-component-1475912223600-4"]},"childs":{"gaea-component-1475912222125-3":{"props":{"style":{"flexGrow":"1"},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912221054-2"},"gaea-component-1475912223600-4":{"props":{"style":{"flexGrow":"1"},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912221054-2"}}}`

const THREE_COLUMN = `{"name":"3列","mapUniqueKey":"gaea-component-1475912307384-2","componentInfo":{"props":{"style":{},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912305457-1","layoutChilds":["gaea-component-1475912308194-3","gaea-component-1475912309672-5","gaea-component-1475912310663-6"]},"childs":{"gaea-component-1475912308194-3":{"props":{"style":{"flexGrow":"1"},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912307384-2"},"gaea-component-1475912309672-5":{"props":{"style":{"flexGrow":"1"},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912307384-2"},"gaea-component-1475912310663-6":{"props":{"style":{"flexGrow":"1"},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912307384-2"}}}`

const FOUR_COLUMN = `{"name":"4列","mapUniqueKey":"gaea-component-1475912307384-2","componentInfo":{"props":{"style":{},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912305457-1","layoutChilds":["gaea-component-1475912308194-3","gaea-component-1475912309002-4","gaea-component-1475912309672-5","gaea-component-1475912310663-6"]},"childs":{"gaea-component-1475912308194-3":{"props":{"style":{"flexGrow":"1"},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912307384-2"},"gaea-component-1475912309002-4":{"props":{"style":{"flexGrow":"1"},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912307384-2"},"gaea-component-1475912309672-5":{"props":{"style":{"flexGrow":"1"},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912307384-2"},"gaea-component-1475912310663-6":{"props":{"style":{"flexGrow":"1"},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475912307384-2"}}}`

const LEFT_IMAGE_RIGHT_TEXT = `{"name":"左图右字","mapUniqueKey":"gaea-component-1475893714294-2","componentInfo":{"props":{"style":{},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475893709367-1","layoutChilds":["gaea-component-1475893715582-3","gaea-component-1475893719087-4"]},"childs":{"gaea-component-1475893715582-3":{"props":{"style":{},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475893714294-2","layoutChilds":["gaea-component-1475893764790-5"]},"gaea-component-1475893764790-5":{"props":{"style":{},"gaeaUniqueKey":"gaea-text"},"parentMapUniqueKey":"gaea-component-1475893715582-3"},"gaea-component-1475893719087-4":{"props":{"style":{"flexGrow":"1"},"gaeaUniqueKey":"gaea-layout"},"parentMapUniqueKey":"gaea-component-1475893714294-2","layoutChilds":["gaea-component-1475893766342-6"]},"gaea-component-1475893766342-6":{"props":{"style":{},"gaeaUniqueKey":"gaea-text"},"parentMapUniqueKey":"gaea-component-1475893719087-4"}}}`

@inject('setting', 'viewport') @observer
export default class Template extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentDidMount() {
        new DragList(ReactDOM.findDOMNode(this.refs['dragContainer1']), this.props.viewport)
        new DragList(ReactDOM.findDOMNode(this.refs['dragContainer2']), this.props.viewport)
    }


    render() {
        return (
            <div className="_namespace">
                <div className="title">布局</div>
                <div className="drag-container"
                     ref="dragContainer1">
                    <div className="template-item" data-source={TWO_COLUMN}>两列</div>
                    <div className="template-item" data-source={THREE_COLUMN}>三列</div>
                    <div className="template-item" data-source={FOUR_COLUMN}>四列</div>
                </div>

                <div className="title">卡片</div>
                <div className="drag-container"
                     ref="dragContainer2">
                    <div className="template-item" data-source={LEFT_IMAGE_RIGHT_TEXT}>左图右字</div>
                </div>
            </div>
        )
    }
}