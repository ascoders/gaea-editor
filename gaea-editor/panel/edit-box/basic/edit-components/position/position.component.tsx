import * as React from 'react'
import * as typings from './position.type'
import {observer, inject} from 'mobx-react'
import * as _ from 'lodash'

import {ButtonGroup, Button} from '../../../../../../../../web-common/button/index'
import {Number} from '../../../../../../../../web-common/number/index'
import {Tooltip} from '../../../../../../../../web-common/tooltip/index'

import './position.scss'

@inject('viewport', 'application') @observer
export default class EditComponentPosition extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
    }

    handleUpdate(field: string, value: string) {
        this.props.viewport.prepareWriteHistory()
        if (value === 'relative') {
            this.props.viewport.updateComponentValueWithNoHistory('style.left', null)
            this.props.viewport.updateComponentValueWithNoHistory('style.top', null)
            this.props.viewport.updateComponentValueWithNoHistory('style.right', null)
            this.props.viewport.updateComponentValueWithNoHistory('style.bottom', null)
            this.props.viewport.updateComponentValueWithNoHistory('style.zIndex', null)
        } else if (value = 'absolute') {
            this.props.viewport.updateComponentValueWithNoHistory('style.left', 0)
            this.props.viewport.updateComponentValueWithNoHistory('style.top', 0)
            this.props.viewport.updateComponentValueWithNoHistory('style.right', null)
            this.props.viewport.updateComponentValueWithNoHistory('style.bottom', null)
            this.props.viewport.updateComponentValueWithNoHistory('style.zIndex', 1)
        }
        this.props.viewport.updateComponentValueWithNoHistory(field, value)
        this.props.viewport.writeHistory()
    }

    stringifyNumber(count: number): string {
        if (count === null || count === undefined) {
            return ''
        }
        return count.toString()
    }

    parseToNumber(numberc: string) {
        if (numberc === '') {
            return null as number
        } else {
            return parseInt(numberc)
        }
    }

    getLeftOrRight() {
        if (this.componentInfo.props.style.left === null) {
            return 'right'
        } else {
            return 'left'
        }
    }

    getTopOrBottom() {
        if (this.componentInfo.props.style.top === null) {
            return 'bottom'
        } else {
            return 'top'
        }
    }

    handleChangePositionNumber(position: string, value: string) {
        this.props.viewport.updateComponentValue(`style.${position}`, this.parseToNumber(value))
    }

    handleChangePosition(x: string, y: string) {
        this.props.viewport.prepareWriteHistory()

        if (x === 'left') {
            this.props.viewport.updateComponentValueWithNoHistory('style.left', 0)
            this.props.viewport.updateComponentValueWithNoHistory('style.right', null)
        } else {
            this.props.viewport.updateComponentValueWithNoHistory('style.left', null)
            this.props.viewport.updateComponentValueWithNoHistory('style.right', 0)
        }

        if (y === 'top') {
            this.props.viewport.updateComponentValueWithNoHistory('style.top', 0)
            this.props.viewport.updateComponentValueWithNoHistory('style.bottom', null)
        } else {
            this.props.viewport.updateComponentValueWithNoHistory('style.top', null)
            this.props.viewport.updateComponentValueWithNoHistory('style.bottom', 0)
        }

        this.props.viewport.writeHistory()
    }

    handleChangeZindex(value: string) {
        this.props.viewport.updateComponentValue(`style.zIndex`, this.parseToNumber(value))
    }

    render() {
        return (
            <div className="_namespace">
                <ButtonGroup>
                    <Tooltip title="相对上一个元素位置布局">
                        <Button style={{padding:'0 10px'}}
                                active={this.componentInfo.props.style.position==='relative'}
                                onClick={this.handleUpdate.bind(this, 'style.position', 'relative')}>相对定位</Button>
                    </Tooltip>

                    <Tooltip title="悬浮在页面之上">
                        <Button style={{padding:'0 10px'}}
                                active={this.componentInfo.props.style.position==='absolute'}
                                onClick={this.handleUpdate.bind(this, 'style.position', 'absolute')}>绝对定位</Button>
                    </Tooltip>
                </ButtonGroup>

                {this.componentInfo.props.style.position === 'absolute' &&
                <div className="absolute-container">
                    <div className="row">
                        <div className="position-control-container">
                            <Button className="left-top"
                                    active={this.getLeftOrRight()==='left'&&this.getTopOrBottom()==='top'}
                                    onClick={this.handleChangePosition.bind(this,'left','top')}>
                                <i className="fa fa-chevron-left"/>
                            </Button>
                            <Button className="right-top"
                                    active={this.getLeftOrRight()==='right'&&this.getTopOrBottom()==='top'}
                                    onClick={this.handleChangePosition.bind(this,'right','top')}>
                                <i className="fa fa-chevron-left"/>
                            </Button>
                            <Button className="left-bottom"
                                    active={this.getLeftOrRight()==='left'&&this.getTopOrBottom()==='bottom'}
                                    onClick={this.handleChangePosition.bind(this,'left','bottom')}>
                                <i className="fa fa-chevron-left"/>
                            </Button>
                            <Button className="right-bottom"
                                    active={this.getLeftOrRight()==='right'&&this.getTopOrBottom()==='bottom'}
                                    onClick={this.handleChangePosition.bind(this,'right','bottom')}>
                                <i className="fa fa-chevron-left"/>
                            </Button>
                        </div>
                        <div className="position-number-container">
                            <Number label="x"
                                    onChange={this.handleChangePositionNumber.bind(this, this.getLeftOrRight())}
                                    value={this.stringifyNumber(this.componentInfo.props.style[this.getLeftOrRight()])}/>
                            <Number label="y"
                                    style={{marginLeft:5}}
                                    onChange={this.handleChangePositionNumber.bind(this, this.getTopOrBottom())}
                                    value={this.stringifyNumber(this.componentInfo.props.style[this.getTopOrBottom()])}/>
                        </div>
                    </div>

                    <div className="row"
                         style={{marginTop:10}}>
                        <Number label="zIndex"
                                onChange={this.handleChangeZindex.bind(this)}
                                value={this.stringifyNumber(this.componentInfo.props.style.zIndex as number)}/>
                    </div>
                </div>
                }
            </div>
        )
    }
}