import * as React from 'react'
import * as typings from './font.type'
import {observer, inject} from 'mobx-react'

import {Select} from '../../../../../../../../web-common/select/index'
import {Tooltip} from '../../../../../../../../web-common/tooltip/index'
import {ButtonGroup, Button} from '../../../../../../../../web-common/button/index'
import {Number} from '../../../../../../../../web-common/number/index'
import Color from '../../utils/color/color.component'

import './font.scss'

const fontWeightOpts = [{
    key: '100',
    value: '100 - Thin'
}, {
    key: '200',
    value: '200 - Extra Light'
}, {
    key: '300',
    value: '300 - Light'
}, {
    key: '400',
    value: '400 - Normal'
}, {
    key: '500',
    value: '500 - Medium'
}, {
    key: '600',
    value: '600 - Semi Bold'
}, {
    key: '700',
    value: '700 - Bold'
}, {
    key: '800',
    value: '800 - Extra Bold'
}, {
    key: '900',
    value: '900 - Black'
}]

@inject('viewport', 'application') @observer
export default class EditComponentFont extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo
    private colorChangeStatus = 'finish'

    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
    }

    handleChangeFontWeight(value: string) {
        this.props.viewport.updateComponentValue('style.fontWeight', value)
    }

    handleChangeFontSize(value: string) {
        if (value === '') {
            this.props.viewport.updateComponentValue('style.fontSize', null)
        } else {
            this.props.viewport.updateComponentValue('style.fontSize', parseInt(value))
        }
    }

    handleChangeLineHeight(value: string) {
        if (value === '') {
            this.props.viewport.updateComponentValue('style.lineHeight', null)
        } else {
            this.props.viewport.updateComponentValue('style.lineHeight', parseInt(value))
        }
    }

    handleChange(field: string, value: string) {
        this.props.viewport.updateComponentValue(field, value)
    }

    handleColorChange(color: any) {
        if (this.colorChangeStatus === 'finish') {
            this.colorChangeStatus = 'start'
            this.props.viewport.prepareWriteHistory()
        }
        this.props.viewport.updateComponentValueWithNoHistory('style.color', `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)
    }

    handleColorChangeComplete(color: any) {
        this.colorChangeStatus = 'finish'
        this.props.viewport.writeHistory()
    }

    /**
     * 修改换行属性
     */
    handleChangeWrap(type: number) {
        switch (type) {
            case 1:
                this.props.viewport.prepareWriteHistory()
                this.props.viewport.updateComponentValueWithNoHistory('style.whiteSpace', null)
                this.props.viewport.updateComponentValueWithNoHistory('style.wordBreak', 'normal')
                this.props.viewport.writeHistory()
                break
            case 2:
                this.props.viewport.prepareWriteHistory()
                this.props.viewport.updateComponentValueWithNoHistory('style.whiteSpace', 'nowrap')
                this.props.viewport.updateComponentValueWithNoHistory('style.wordBreak', 'normal')
                this.props.viewport.writeHistory()
                break
            case 3:
                this.props.viewport.prepareWriteHistory()
                this.props.viewport.updateComponentValueWithNoHistory('style.whiteSpace', null)
                this.props.viewport.updateComponentValueWithNoHistory('style.wordBreak', 'break-all')
                this.props.viewport.writeHistory()
                break
        }
    }

    render() {
        const fontWeight = {
            defaultValue: this.componentInfo.props.style.fontWeight ? this.componentInfo.props.style.fontWeight.toString() : '400',
            options: fontWeightOpts
        }

        return (
            <div className="_namespace">
                <div className="row-container">
                    <div className="left-container">
                        <div className="icon-container">FW</div>
                        <Select label="" {...fontWeight}
                                onChange={this.handleChangeFontWeight.bind(this)}/>
                    </div>
                    <div className="right-container">
                        <div className="icon-container">QX</div>
                        <ButtonGroup>
                            <Tooltip title="普通">
                                <Button active={this.componentInfo.props.style.fontStyle === 'normal'}
                                        onClick={this.handleChange.bind(this, 'style.fontStyle', 'normal')}>1</Button>
                            </Tooltip>
                            <Tooltip title="倾斜">
                                <Button active={this.componentInfo.props.style.fontStyle === 'italic'}
                                        onClick={this.handleChange.bind(this, 'style.fontStyle', 'italic')}>2</Button>
                            </Tooltip>
                        </ButtonGroup>
                    </div>
                </div>

                <div className="row-container">
                    <div className="left-container">
                        <div className="icon-container">Color</div>
                        <Color onChange={this.handleColorChange.bind(this)}
                               onChangeComplete={this.handleColorChangeComplete.bind(this)}
                               color={this.componentInfo.props.style.color || 'rgba(1,1,1,1)'}/>
                    </div>
                    <div className="right-container-2">
                        <div className="icon-container">Size</div>
                        <Number label=""
                                placeholder="Null"
                                value={this.componentInfo.props.style.fontSize ? this.componentInfo.props.style.fontSize.toString() : ''}
                                onChange={this.handleChangeFontSize.bind(this)}/>
                    </div>
                </div>

                <div className="row-container">
                    <div className="left-container">
                        <div className="icon-container">行高</div>
                        <Number label=""
                                placeholder="Null"
                                value={this.componentInfo.props.style.lineHeight ? this.componentInfo.props.style.lineHeight.toString() : ''}
                                onChange={this.handleChangeLineHeight.bind(this)}/>
                    </div>
                </div>

                <div className="row-container">
                    <div className="left-container">
                        <div className="icon-container">对齐</div>
                        <ButtonGroup>
                            <Tooltip title="左对齐">
                                <Button active={this.componentInfo.props.style.textAlign === 'left'}
                                        onClick={this.handleChange.bind(this, 'style.textAlign', 'left')}>1</Button>
                            </Tooltip>
                            <Tooltip title="居中">
                                <Button active={this.componentInfo.props.style.textAlign === 'center'}
                                        onClick={this.handleChange.bind(this, 'style.textAlign', 'center')}>2</Button>
                            </Tooltip>
                            <Tooltip title="右对齐">
                                <Button active={this.componentInfo.props.style.textAlign === 'right'}
                                        onClick={this.handleChange.bind(this, 'style.textAlign', 'right')}>3</Button>
                            </Tooltip>
                            <Tooltip title="左右对齐">
                                <Button active={this.componentInfo.props.style.textAlign === 'justify'}
                                        onClick={this.handleChange.bind(this, 'style.textAlign', 'justify')}>4</Button>
                            </Tooltip>
                        </ButtonGroup>
                    </div>
                </div>

                <div className="row-container">
                    <div className="left-container">
                        <div className="icon-container">划线</div>
                        {this.props.application.isReactNative ?
                            <ButtonGroup>
                                <Tooltip title="无">
                                    <Button active={this.componentInfo.props.style.textDecorationLine === 'none'}
                                            onClick={this.handleChange.bind(this, 'style.textDecorationLine', 'none')}>1</Button>
                                </Tooltip>
                                <Tooltip title="下划线">
                                    <Button active={this.componentInfo.props.style.textDecorationLine === 'underline'}
                                            onClick={this.handleChange.bind(this, 'style.textDecorationLine', 'underline')}>2</Button>
                                </Tooltip>
                                <Tooltip title="中划线">
                                    <Button active={this.componentInfo.props.style.textDecorationLine === 'line-through'}
                                            onClick={this.handleChange.bind(this, 'style.textDecorationLine', 'line-through')}>4</Button>
                                </Tooltip>
                                <Tooltip title="中下划线">
                                    <Button active={this.componentInfo.props.style.textDecorationLine === 'underline line-through'}
                                            onClick={this.handleChange.bind(this, 'style.textDecorationLine', 'underline line-through')}>5</Button>
                                </Tooltip>
                            </ButtonGroup>:
                            <ButtonGroup>
                                <Tooltip title="无">
                                    <Button active={this.componentInfo.props.style.textDecoration === 'none'}
                                            onClick={this.handleChange.bind(this, 'style.textDecoration', 'none')}>1</Button>
                                </Tooltip>
                                <Tooltip title="下划线">
                                    <Button active={this.componentInfo.props.style.textDecoration === 'underline'}
                                            onClick={this.handleChange.bind(this, 'style.textDecoration', 'underline')}>2</Button>
                                </Tooltip>
                                <Tooltip title="上划线">
                                    <Button active={this.componentInfo.props.style.textDecoration === 'overline'}
                                            onClick={this.handleChange.bind(this, 'style.textDecoration', 'overline')}>3</Button>
                                </Tooltip>
                                <Tooltip title="中划线">
                                    <Button active={this.componentInfo.props.style.textDecoration === 'line-through'}
                                            onClick={this.handleChange.bind(this, 'style.textDecoration', 'line-through')}>4</Button>
                                </Tooltip>
                                <Tooltip title="中下划线">
                                    <Button active={this.componentInfo.props.style.textDecoration === 'underline line-through'}
                                            onClick={this.handleChange.bind(this, 'style.textDecoration', 'underline line-through')}>5</Button>
                                </Tooltip>
                            </ButtonGroup>
                        }
                    </div>
                </div>

                {!this.props.application.isReactNative &&
                <div className="row-container">
                    <div className="left-container">
                        <div className="icon-container">换行</div>
                        <ButtonGroup>
                            <Tooltip title="自动">
                                <Button active={this.componentInfo.props.style.wordBreak === 'normal' && this.componentInfo.props.style.whiteSpace === null}
                                        onClick={this.handleChangeWrap.bind(this, 1)}>1</Button>
                            </Tooltip>
                            <Tooltip title="不换行">
                                <Button active={this.componentInfo.props.style.whiteSpace === 'nowrap'}
                                        onClick={this.handleChangeWrap.bind(this, 2)}>2</Button>
                            </Tooltip>
                            <Tooltip title="强制换行">
                                <Button active={this.componentInfo.props.style.wordBreak === 'break-all'}
                                        onClick={this.handleChangeWrap.bind(this, 3)}>3</Button>
                            </Tooltip>
                        </ButtonGroup>
                    </div>
                </div>
                }
            </div>
        )
    }
}