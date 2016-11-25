import * as React from 'react'
import * as typings from './editor-attribute-font.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { Select } from '../../../../../web-common/select/index'
import { Tooltip } from '../../../../../web-common/tooltip/index'
import { ButtonGroup, Button } from '../../../../../web-common/button/index'
import { Number } from '../../../../../web-common/number/index'
import Color from '../../../components/color/color.component'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './editor-attribute-font.scss'

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

@EditorManager.observer(['ViewportStore', 'ApplicationStore', 'ViewportAction'])
export default class EditorAttributeFont extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeFont'

    private colorChangeStatus = 'finish'

    handleChangeFontWeight(value: string) {
        this.props.ViewportAction.updateCurrentEditComponentProps('style.fontWeight', value)
    }

    handleChangeFontSize(value: string) {
        if (value === '') {
            this.props.ViewportAction.updateCurrentEditComponentProps('style.fontSize', null)
        } else {
            this.props.ViewportAction.updateCurrentEditComponentProps('style.fontSize', parseInt(value))
        }
    }

    handleChangeLineHeight(value: string) {
        if (value === '') {
            this.props.ViewportAction.updateCurrentEditComponentProps('style.lineHeight', null)
        } else {
            this.props.ViewportAction.updateCurrentEditComponentProps('style.lineHeight', parseInt(value))
        }
    }

    handleChange(field: string, value: string) {
        this.props.ViewportAction.updateCurrentEditComponentProps(field, value)
    }

    handleColorChange(color: any) {
        if (this.colorChangeStatus === 'finish') {
            this.colorChangeStatus = 'start'
            //this.props.ViewportStore.prepareWriteHistory()
        }
        this.props.ViewportAction.updateCurrentEditComponentProps('style.color', `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)
    }

    handleColorChangeComplete(color: any) {
        this.colorChangeStatus = 'finish'
        //this.props.ViewportStore.writeHistory()
    }

    /**
     * 修改换行属性
     */
    handleChangeWrap(type: number) {
        switch (type) {
            case 1:
                //this.props.ViewportStore.prepareWriteHistory()
                this.props.ViewportAction.updateCurrentEditComponentProps('style.whiteSpace', null)
                this.props.ViewportAction.updateCurrentEditComponentProps('style.wordBreak', 'normal')
                //this.props.ViewportStore.writeHistory()
                break
            case 2:
                //this.props.ViewportStore.prepareWriteHistory()
                this.props.ViewportAction.updateCurrentEditComponentProps('style.whiteSpace', 'nowrap')
                this.props.ViewportAction.updateCurrentEditComponentProps('style.wordBreak', 'normal')
                //this.props.ViewportStore.writeHistory()
                break
            case 3:
                //this.props.ViewportStore.prepareWriteHistory()
                this.props.ViewportAction.updateCurrentEditComponentProps('style.whiteSpace', null)
                this.props.ViewportAction.updateCurrentEditComponentProps('style.wordBreak', 'break-all')
                //this.props.ViewportStore.writeHistory()
                break
        }
    }

    render() {
        if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null) {
            return null
        }

        const fontWeight = {
            defaultValue: this.props.ViewportStore.currentEditComponentInfo.props.style.fontWeight ? this.props.ViewportStore.currentEditComponentInfo.props.style.fontWeight.toString() : '400',
            options: fontWeightOpts
        }

        return (
            <div className="_namespace">
                <div className="row-container">
                    <div className="left-container">
                        <div className="icon-container">FW</div>
                        <Select label="" {...fontWeight}
                            onChange={this.handleChangeFontWeight.bind(this)} />
                    </div>
                    <div className="right-container">
                        <div className="icon-container">QX</div>
                        <ButtonGroup>
                            <Tooltip title="普通">
                                <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.fontStyle === 'normal'}
                                    onClick={this.handleChange.bind(this, 'style.fontStyle', 'normal')}>1</Button>
                            </Tooltip>
                            <Tooltip title="倾斜">
                                <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.fontStyle === 'italic'}
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
                            color={this.props.ViewportStore.currentEditComponentInfo.props.style.color || 'rgba(1,1,1,1)'} />
                    </div>
                    <div className="right-container-2">
                        <div className="icon-container">Size</div>
                        <Number label=""
                            placeholder="Null"
                            value={this.props.ViewportStore.currentEditComponentInfo.props.style.fontSize ? this.props.ViewportStore.currentEditComponentInfo.props.style.fontSize.toString() : ''}
                            onChange={this.handleChangeFontSize.bind(this)} />
                    </div>
                </div>

                <div className="row-container">
                    <div className="left-container">
                        <div className="icon-container">行高</div>
                        <Number label=""
                            placeholder="Null"
                            value={this.props.ViewportStore.currentEditComponentInfo.props.style.lineHeight ? this.props.ViewportStore.currentEditComponentInfo.props.style.lineHeight.toString() : ''}
                            onChange={this.handleChangeLineHeight.bind(this)} />
                    </div>
                </div>

                <div className="row-container">
                    <div className="left-container">
                        <div className="icon-container">对齐</div>
                        <ButtonGroup>
                            <Tooltip title="左对齐">
                                <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textAlign === 'left'}
                                    onClick={this.handleChange.bind(this, 'style.textAlign', 'left')}>1</Button>
                            </Tooltip>
                            <Tooltip title="居中">
                                <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textAlign === 'center'}
                                    onClick={this.handleChange.bind(this, 'style.textAlign', 'center')}>2</Button>
                            </Tooltip>
                            <Tooltip title="右对齐">
                                <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textAlign === 'right'}
                                    onClick={this.handleChange.bind(this, 'style.textAlign', 'right')}>3</Button>
                            </Tooltip>
                            <Tooltip title="左右对齐">
                                <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textAlign === 'justify'}
                                    onClick={this.handleChange.bind(this, 'style.textAlign', 'justify')}>4</Button>
                            </Tooltip>
                        </ButtonGroup>
                    </div>
                </div>

                <div className="row-container">
                    <div className="left-container">
                        <div className="icon-container">划线</div>
                        {this.props.ApplicationStore.editorProps.isReactNative ?
                            <ButtonGroup>
                                <Tooltip title="无">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textDecorationLine === 'none'}
                                        onClick={this.handleChange.bind(this, 'style.textDecorationLine', 'none')}>1</Button>
                                </Tooltip>
                                <Tooltip title="下划线">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textDecorationLine === 'underline'}
                                        onClick={this.handleChange.bind(this, 'style.textDecorationLine', 'underline')}>2</Button>
                                </Tooltip>
                                <Tooltip title="中划线">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textDecorationLine === 'line-through'}
                                        onClick={this.handleChange.bind(this, 'style.textDecorationLine', 'line-through')}>4</Button>
                                </Tooltip>
                                <Tooltip title="中下划线">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textDecorationLine === 'underline line-through'}
                                        onClick={this.handleChange.bind(this, 'style.textDecorationLine', 'underline line-through')}>5</Button>
                                </Tooltip>
                            </ButtonGroup> :
                            <ButtonGroup>
                                <Tooltip title="无">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textDecoration === 'none'}
                                        onClick={this.handleChange.bind(this, 'style.textDecoration', 'none')}>1</Button>
                                </Tooltip>
                                <Tooltip title="下划线">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textDecoration === 'underline'}
                                        onClick={this.handleChange.bind(this, 'style.textDecoration', 'underline')}>2</Button>
                                </Tooltip>
                                <Tooltip title="上划线">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textDecoration === 'overline'}
                                        onClick={this.handleChange.bind(this, 'style.textDecoration', 'overline')}>3</Button>
                                </Tooltip>
                                <Tooltip title="中划线">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textDecoration === 'line-through'}
                                        onClick={this.handleChange.bind(this, 'style.textDecoration', 'line-through')}>4</Button>
                                </Tooltip>
                                <Tooltip title="中下划线">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.textDecoration === 'underline line-through'}
                                        onClick={this.handleChange.bind(this, 'style.textDecoration', 'underline line-through')}>5</Button>
                                </Tooltip>
                            </ButtonGroup>
                        }
                    </div>
                </div>

                {!this.props.ApplicationStore.editorProps.isReactNative &&
                    <div className="row-container">
                        <div className="left-container">
                            <div className="icon-container">换行</div>
                            <ButtonGroup>
                                <Tooltip title="自动">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.wordBreak === 'normal' && this.props.ViewportStore.currentEditComponentInfo.props.style.whiteSpace === null}
                                        onClick={this.handleChangeWrap.bind(this, 1)}>1</Button>
                                </Tooltip>
                                <Tooltip title="不换行">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.whiteSpace === 'nowrap'}
                                        onClick={this.handleChangeWrap.bind(this, 2)}>2</Button>
                                </Tooltip>
                                <Tooltip title="强制换行">
                                    <Button active={this.props.ViewportStore.currentEditComponentInfo.props.style.wordBreak === 'break-all'}
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