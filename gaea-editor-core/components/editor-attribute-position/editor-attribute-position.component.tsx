import * as React from 'react'
import * as typings from './editor-attribute-position.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import {ButtonGroup, Button} from '../../../../../web-common/button/index'
import {Number} from '../../../../../web-common/number/index'
import {Tooltip} from '../../../../../web-common/tooltip/index'
import {autoBindMethod} from '../../../../../common/auto-bind/index'

import './editor-attribute-position.scss'

@EditorManager.observer(['viewport'])
export default class EditorAttributePosition extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributePosition'

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction

    handleUpdate(field: string, value: string) {
        //this.props.viewport.prepareWriteHistory()
        if (value === 'relative') {
            this.viewportAction.updateCurrentEditComponentProps('style.left', null)
            this.viewportAction.updateCurrentEditComponentProps('style.top', null)
            this.viewportAction.updateCurrentEditComponentProps('style.right', null)
            this.viewportAction.updateCurrentEditComponentProps('style.bottom', null)
            this.viewportAction.updateCurrentEditComponentProps('style.zIndex', null)
        } else if (value = 'absolute') {
            this.viewportAction.updateCurrentEditComponentProps('style.left', 0)
            this.viewportAction.updateCurrentEditComponentProps('style.top', 0)
            this.viewportAction.updateCurrentEditComponentProps('style.right', null)
            this.viewportAction.updateCurrentEditComponentProps('style.bottom', null)
            this.viewportAction.updateCurrentEditComponentProps('style.zIndex', 1)
        }
        this.viewportAction.updateCurrentEditComponentProps(field, value)
        //this.props.viewport.writeHistory()
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
        if (this.props.viewport.currentEditComponentInfo.props.style.left === null) {
            return 'right'
        } else {
            return 'left'
        }
    }

    getTopOrBottom() {
        if (this.props.viewport.currentEditComponentInfo.props.style.top === null) {
            return 'bottom'
        } else {
            return 'top'
        }
    }

    handleChangePositionNumber(position: string, value: string) {
        this.viewportAction.updateCurrentEditComponentProps(`style.${position}`, this.parseToNumber(value))
    }

    handleChangePosition(x: string, y: string) {
        //this.props.viewport.prepareWriteHistory()

        if (x === 'left') {
            this.viewportAction.updateCurrentEditComponentProps('style.left', 0)
            this.viewportAction.updateCurrentEditComponentProps('style.right', null)
        } else {
            this.viewportAction.updateCurrentEditComponentProps('style.left', null)
            this.viewportAction.updateCurrentEditComponentProps('style.right', 0)
        }

        if (y === 'top') {
            this.viewportAction.updateCurrentEditComponentProps('style.top', 0)
            this.viewportAction.updateCurrentEditComponentProps('style.bottom', null)
        } else {
            this.viewportAction.updateCurrentEditComponentProps('style.top', null)
            this.viewportAction.updateCurrentEditComponentProps('style.bottom', 0)
        }

        //this.props.viewport.writeHistory()
    }

    handleChangeZindex(value: string) {
        this.viewportAction.updateCurrentEditComponentProps(`style.zIndex`, this.parseToNumber(value))
    }

    render() {
        return (
            <div className="_namespace">
                <ButtonGroup>
                    <Tooltip title="相对上一个元素位置布局">
                        <Button style={{padding:'0 10px'}}
                                active={this.props.viewport.currentEditComponentInfo.props.style.position==='relative'}
                                onClick={this.handleUpdate.bind(this, 'style.position', 'relative')}>相对定位</Button>
                    </Tooltip>

                    <Tooltip title="悬浮在页面之上">
                        <Button style={{padding:'0 10px'}}
                                active={this.props.viewport.currentEditComponentInfo.props.style.position==='absolute'}
                                onClick={this.handleUpdate.bind(this, 'style.position', 'absolute')}>绝对定位</Button>
                    </Tooltip>
                </ButtonGroup>

                {this.props.viewport.currentEditComponentInfo.props.style.position === 'absolute' &&
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
                                    value={this.stringifyNumber(this.props.viewport.currentEditComponentInfo.props.style[this.getLeftOrRight()])}/>
                            <Number label="y"
                                    style={{marginLeft:5}}
                                    onChange={this.handleChangePositionNumber.bind(this, this.getTopOrBottom())}
                                    value={this.stringifyNumber(this.props.viewport.currentEditComponentInfo.props.style[this.getTopOrBottom()])}/>
                        </div>
                    </div>

                    <div className="row"
                         style={{marginTop:10}}>
                        <Number label="zIndex"
                                onChange={this.handleChangeZindex.bind(this)}
                                value={this.stringifyNumber(this.props.viewport.currentEditComponentInfo.props.style.zIndex as number)}/>
                    </div>
                </div>
                }
            </div>
        )
    }
}