import * as React from 'react'
import * as typings from './border.type'
import {observer, inject} from 'mobx-react'

import {Select} from '../../../../../../../../web-common/select/index'
import {Tooltip} from '../../../../../../../../web-common/tooltip/index'
import {ButtonGroup, Button} from '../../../../../../../../web-common/button/index'
import {Number} from '../../../../../../../../web-common/number/index'
import Color from '../../utils/color/color.component'

import './border.scss'

@inject('viewport', 'application') @observer
export default class EditComponentBorder extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo
    private colorChangeStatus = 'finish'
    private colorHasChange = false

    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
    }

    /**
     * 获取统一的边框弧度
     */
    getCommonBorderRadius() {
        // 计算统一圆角弯度
        let borderRadius = 0

        if (this.componentInfo.props.style.borderTopLeftRadius !== null) {
            borderRadius = this.componentInfo.props.style.borderTopLeftRadius
        }
        if (this.componentInfo.props.style.borderTopRightRadius !== null) {
            borderRadius = this.componentInfo.props.style.borderTopRightRadius
        }
        if (this.componentInfo.props.style.borderBottomRightRadius !== null) {
            borderRadius = this.componentInfo.props.style.borderBottomRightRadius
        }
        if (this.componentInfo.props.style.borderBottomLeftRadius !== null) {
            borderRadius = this.componentInfo.props.style.borderBottomLeftRadius
        }
        return borderRadius
    }

    /**
     * 统一边框弧度变化
     */
    handleCommonBorderRadiusChange(value: string) {
        if (this.componentInfo.props.style.borderTopLeftRadius !== null || this.componentInfo.props.style.borderTopRightRadius !== null || this.componentInfo.props.style.borderBottomRightRadius !== null || this.componentInfo.props.style.borderBottomLeftRadius !== null) {
            this.props.viewport.prepareWriteHistory()
            if (this.componentInfo.props.style.borderTopLeftRadius !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderTopLeftRadius', parseFloat(value))
            }
            if (this.componentInfo.props.style.borderTopRightRadius !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderTopRightRadius', parseFloat(value))
            }
            if (this.componentInfo.props.style.borderBottomRightRadius !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomRightRadius', parseFloat(value))
            }
            if (this.componentInfo.props.style.borderBottomLeftRadius !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomLeftRadius', parseFloat(value))
            }
            this.props.viewport.writeHistory()
        }
    }

    handleRadiusClick(position: string) {
        switch (position) {
            case 'topLeft':
                if (this.componentInfo.props.style.borderTopLeftRadius === null) {
                    this.props.viewport.updateComponentValue('style.borderTopLeftRadius', this.getCommonBorderRadius())
                } else {
                    this.props.viewport.updateComponentValue('style.borderTopLeftRadius', null)
                }
                break
            case 'topRight':
                if (this.componentInfo.props.style.borderTopRightRadius === null) {
                    this.props.viewport.updateComponentValue('style.borderTopRightRadius', this.getCommonBorderRadius())
                } else {
                    this.props.viewport.updateComponentValue('style.borderTopRightRadius', null)
                }
                break
            case 'bottomRight':
                if (this.componentInfo.props.style.borderBottomRightRadius === null) {
                    this.props.viewport.updateComponentValue('style.borderBottomRightRadius', this.getCommonBorderRadius())
                } else {
                    this.props.viewport.updateComponentValue('style.borderBottomRightRadius', null)
                }
                break
            case 'bottomLeft':
                if (this.componentInfo.props.style.borderBottomLeftRadius === null) {
                    this.props.viewport.updateComponentValue('style.borderBottomLeftRadius', this.getCommonBorderRadius())
                } else {
                    this.props.viewport.updateComponentValue('style.borderBottomLeftRadius', null)
                }
                break
        }
    }

    getCommonBorder() {
        let style: string
        let width: number
        let color: string

        if (this.componentInfo.props.style.borderLeftWidth !== null) {
            width = this.componentInfo.props.style.borderLeftWidth
            style = this.componentInfo.props.style.borderLeftStyle
            color = this.componentInfo.props.style.borderLeftColor
        }
        if (this.componentInfo.props.style.borderTopWidth !== null) {
            width = this.componentInfo.props.style.borderTopWidth
            style = this.componentInfo.props.style.borderTopStyle
            color = this.componentInfo.props.style.borderTopColor
        }
        if (this.componentInfo.props.style.borderRightWidth !== null) {
            width = this.componentInfo.props.style.borderRightWidth
            style = this.componentInfo.props.style.borderRightStyle
            color = this.componentInfo.props.style.borderRightColor
        }
        if (this.componentInfo.props.style.borderBottomWidth !== null) {
            width = this.componentInfo.props.style.borderBottomWidth
            style = this.componentInfo.props.style.borderBottomStyle
            color = this.componentInfo.props.style.borderBottomColor
        }

        if (this.props.application.isReactNative) {
            color = this.componentInfo.props.style.borderColor
        }

        return {style, width, color}
    }

    handleBorderClick(position: string) {
        const commonBorder = this.getCommonBorder()

        switch (position) {
            case 'left':
                if (this.componentInfo.props.style.borderLeftWidth === null) {
                    this.props.viewport.prepareWriteHistory()
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftWidth', commonBorder.width)
                    if (this.props.application.isReactNative) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', commonBorder.color)
                    } else {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftColor', commonBorder.color)
                    }
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftStyle', commonBorder.style)
                    this.props.viewport.writeHistory()
                } else {
                    this.props.viewport.prepareWriteHistory()
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftWidth', null)
                    if (this.props.application.isReactNative) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', null)
                    } else {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftColor', null)
                    }
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftStyle', null)
                    this.props.viewport.writeHistory()
                }
                break
            case 'top':
                if (this.componentInfo.props.style.borderTopWidth === null) {
                    this.props.viewport.prepareWriteHistory()
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderTopWidth', commonBorder.width)
                    if (this.props.application.isReactNative) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', commonBorder.color)
                    } else {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderTopColor', commonBorder.color)
                    }
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderTopStyle', commonBorder.style)
                    this.props.viewport.writeHistory()
                } else {
                    this.props.viewport.prepareWriteHistory()
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderTopWidth', null)
                    if (this.props.application.isReactNative) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', null)
                    } else {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderTopColor', null)
                    }
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderTopStyle', null)
                    this.props.viewport.writeHistory()
                }
                break
            case 'right':
                if (this.componentInfo.props.style.borderRightWidth === null) {
                    this.props.viewport.prepareWriteHistory()
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderRightWidth', commonBorder.width)
                    if (this.props.application.isReactNative) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', commonBorder.color)
                    } else {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderRightColor', commonBorder.color)
                    }
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderRightStyle', commonBorder.style)
                    this.props.viewport.writeHistory()
                } else {
                    this.props.viewport.prepareWriteHistory()
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderRightWidth', null)
                    if (this.props.application.isReactNative) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', null)
                    } else {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderRightColor', null)
                    }
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderRightStyle', null)
                    this.props.viewport.writeHistory()
                }
                break
            case 'bottom':
                if (this.componentInfo.props.style.borderBottomWidth === null) {
                    this.props.viewport.prepareWriteHistory()
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomWidth', commonBorder.width)
                    if (this.props.application.isReactNative) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', commonBorder.color)
                    } else {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomColor', commonBorder.color)
                    }
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomStyle', commonBorder.style)
                    this.props.viewport.writeHistory()
                } else {
                    this.props.viewport.prepareWriteHistory()
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomWidth', null)
                    if (this.props.application.isReactNative) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', null)
                    } else {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomColor', null)
                    }
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomStyle', null)
                    this.props.viewport.writeHistory()
                }
                break
        }
    }

    handleBorderStyleChange(style: string) {
        if (this.componentInfo.props.style.borderTopWidth !== null || this.componentInfo.props.style.borderLeftWidth !== null || this.componentInfo.props.style.borderRightWidth !== null || this.componentInfo.props.style.borderBottomWidth !== null) {
            this.props.viewport.prepareWriteHistory()
            if (this.componentInfo.props.style.borderLeftWidth !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftStyle', style)
            }
            if (this.componentInfo.props.style.borderTopWidth !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderTopStyle', style)
            }
            if (this.componentInfo.props.style.borderRightWidth !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderRightStyle', style)
            }
            if (this.componentInfo.props.style.borderBottomWidth !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomStyle', style)
            }
            this.props.viewport.writeHistory()
        }
    }

    handleBorderColorChange(color: any) {
        const rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`

        if (this.componentInfo.props.style.borderTopWidth !== null || this.componentInfo.props.style.borderLeftWidth !== null || this.componentInfo.props.style.borderRightWidth !== null || this.componentInfo.props.style.borderBottomWidth !== null) {
            this.colorHasChange = true
            if (this.colorChangeStatus === 'finish') {
                this.colorChangeStatus = 'start'
                this.props.viewport.prepareWriteHistory()
            }

            if (this.props.application.isReactNative) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', rgba)
            } else {
                if (this.componentInfo.props.style.borderLeftWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftColor', rgba)
                }
                if (this.componentInfo.props.style.borderTopWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderTopColor', rgba)
                }
                if (this.componentInfo.props.style.borderRightWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderRightColor', rgba)
                }
                if (this.componentInfo.props.style.borderBottomWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomColor', rgba)
                }
            }

        } else {
            this.colorHasChange = false
        }
    }

    handleBorderColorChangeComplete() {
        this.colorChangeStatus = 'finish'
        if (this.colorHasChange) {
            this.props.viewport.writeHistory()
        }
    }

    handleBorderWidthChange(value: string) {
        if (this.componentInfo.props.style.borderTopWidth !== null || this.componentInfo.props.style.borderLeftWidth !== null || this.componentInfo.props.style.borderRightWidth !== null || this.componentInfo.props.style.borderBottomWidth !== null) {
            this.props.viewport.prepareWriteHistory()
            if (this.componentInfo.props.style.borderLeftWidth !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftWidth', parseFloat(value))
            }
            if (this.componentInfo.props.style.borderTopWidth !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderTopWidth', parseFloat(value))
            }
            if (this.componentInfo.props.style.borderRightWidth !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderRightWidth', parseFloat(value))
            }
            if (this.componentInfo.props.style.borderBottomWidth !== null) {
                this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomWidth', parseFloat(value))
            }
            this.props.viewport.writeHistory()
        }
    }

    render() {
        const borderRadius = this.getCommonBorderRadius()
        const commonBorder = this.getCommonBorder()

        return (
            <div className="_namespace">
                <div className="border-container">
                    <div className="left-container">
                        <Button className="border-left"
                                active={this.componentInfo.props.style.borderLeftWidth!==null}
                                onClick={this.handleBorderClick.bind(this, 'left')}>x</Button>
                        <Button className="border-top"
                                active={this.componentInfo.props.style.borderTopWidth!==null}
                                onClick={this.handleBorderClick.bind(this, 'top')}>x</Button>
                        <Button className="border-right"
                                active={this.componentInfo.props.style.borderRightWidth!==null}
                                onClick={this.handleBorderClick.bind(this, 'right')}>x</Button>
                        <Button className="border-bottom"
                                active={this.componentInfo.props.style.borderBottomWidth!==null}
                                onClick={this.handleBorderClick.bind(this, 'bottom')}>x</Button>
                    </div>

                    <div className="right-container">
                        <div className="row">
                            <div className="icon-title">Style</div>
                            <ButtonGroup>
                                {this.props.application.isReactNative ?
                                    <Button active={commonBorder.style===null}
                                            onClick={this.handleBorderStyleChange.bind(this, null)}>x</Button>:
                                    <Button active={commonBorder.style==='none'}
                                            onClick={this.handleBorderStyleChange.bind(this, 'none')}>x</Button>
                                }
                                <Button active={commonBorder.style==='solid'}
                                        onClick={this.handleBorderStyleChange.bind(this, 'solid')}>—</Button>
                                <Button active={commonBorder.style==='dashed'}
                                        onClick={this.handleBorderStyleChange.bind(this, 'dashed')}>-</Button>
                                <Button active={commonBorder.style==='dotted'}
                                        onClick={this.handleBorderStyleChange.bind(this, 'dotted')}>-.</Button>
                            </ButtonGroup>
                        </div>
                        <div className="row">
                            <div className="icon-title">Width</div>
                            <Number label=""
                                    value={commonBorder.width?commonBorder.width.toString():'0'}
                                    onChange={this.handleBorderWidthChange.bind(this)}/>
                        </div>
                        <div className="row">
                            <div className="icon-title">Color</div>
                            <Color absoluteStyle={{left:-120}}
                                   onChange={this.handleBorderColorChange.bind(this)}
                                   onChangeComplete={this.handleBorderColorChangeComplete.bind(this)}
                                   color={commonBorder.color || 'white'}/>
                        </div>
                    </div>
                </div>

                <div className="radius-container">
                    <div className="left-container">
                        <div className="radius-content">
                            <Button className="radius-left"
                                    active={this.componentInfo.props.style.borderTopLeftRadius!==null}
                                    onClick={this.handleRadiusClick.bind(this, 'topLeft')}>x</Button>
                            <Button className="radius-top"
                                    active={this.componentInfo.props.style.borderTopRightRadius!==null}
                                    onClick={this.handleRadiusClick.bind(this, 'topRight')}>x</Button>
                            <Button className="radius-right"
                                    active={this.componentInfo.props.style.borderBottomRightRadius!==null}
                                    onClick={this.handleRadiusClick.bind(this, 'bottomRight')}>x</Button>
                            <Button className="radius-bottom"
                                    active={this.componentInfo.props.style.borderBottomLeftRadius!==null}
                                    onClick={this.handleRadiusClick.bind(this, 'bottomLeft')}>x</Button>
                        </div>
                    </div>

                    <div className="right-container">
                        <div className="row">
                            <div className="icon-title">边距</div>
                            <Number label=""
                                    min={0}
                                    onChange={this.handleCommonBorderRadiusChange.bind(this)}
                                    value={borderRadius?borderRadius.toString():'0'}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}