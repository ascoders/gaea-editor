import * as React from 'react'
import * as typings from './editor-attribute-overflow.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import {Button, ButtonGroup} from '../../../../../web-common/button/index'
import {Tooltip} from '../../../../../web-common/tooltip/index'
import {autoBindMethod} from '../../../../../common/auto-bind/index'

import './editor-attribute-overflow.scss'

@EditorManager.observer(['ViewportStore', 'ApplicationStore','ViewportAction'])
export default class EditorAttributeOverflow extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeOverflow'

    // 判断 overflowX 和 overflowY 是否相同
    isOverflowXYEqual() {
        return this.props.ViewportStore.currentEditComponentInfo.props.style.overflowX === this.props.ViewportStore.currentEditComponentInfo.props.style.overflowY || (this.props.ViewportStore.currentEditComponentInfo.props.style.overflowX === null || this.props.ViewportStore.currentEditComponentInfo.props.style.overflowX === 'auto') && (this.props.ViewportStore.currentEditComponentInfo.props.style.overflowY === null || this.props.ViewportStore.currentEditComponentInfo.props.style.overflowY === 'auto')
    }

    init(props: typings.PropsDefine) {
        if (this.isOverflowXYEqual()) {
            this.setState({
                expand: false
            })
        } else {
            this.setState({
                expand: true
            })
        }
    }

    // 判断是否是一种状态
    isStatu(statu: string) {
        const style = this.props.ViewportStore.currentEditComponentInfo.props.style

        if (!this.props.ApplicationStore.editorProps.isReactNative) {
            if ((style.overflow === null || style.overflow === 'auto') && (style.overflowX === null || style.overflowX === 'auto') && (style.overflowY === null || style.overflowY === 'auto')) {
                return statu === 'auto'
            }

            return (style.overflow === statu && style.overflowX === null && style.overflowY === null) || style.overflow === null && style.overflowX === statu && style.overflowY === statu
        }

        if (style.overflow === null || style.overflow === 'auto') {
            return statu === 'auto'
        }

        return style.overflow === statu
    }

    handleUpdateCompressValue(field: string, value: FitGaea.ComponentPropsOptionValue) {
        //this.props.ViewportStore.prepareWriteHistory()
        this.props.ViewportAction.updateCurrentEditComponentProps(field, value)
        if (!this.props.ApplicationStore.editorProps.isReactNative) {
            this.props.ViewportAction.updateCurrentEditComponentProps('style.overflowX', null)
            this.props.ViewportAction.updateCurrentEditComponentProps('style.overflowY', null)
        }
        //this.props.ViewportStore.writeHistory()
    }

    handleUpdateExpandValue(field: string, value: FitGaea.ComponentPropsOptionValue) {
        //this.props.ViewportStore.prepareWriteHistory()
        this.props.ViewportAction.updateCurrentEditComponentProps(field, value)
        this.props.ViewportAction.updateCurrentEditComponentProps('style.overflow', null)
        //this.props.ViewportStore.writeHistory()
    }

    handleExpand() {
        this.setState({
            expand: true
        })
    }

    handleCompress() {
        this.setState({
            expand: false
        })
    }

    renderOverflow() {
        return (
            <ButtonGroup>
                <Tooltip title="Auto">
                    <Button active={this.isStatu('auto')}
                            onClick={this.handleUpdateCompressValue.bind(this, 'style.overflow', 'auto')}>1</Button>
                </Tooltip>

                <Tooltip title="Visible">
                    <Button active={this.isStatu('visible')}
                            onClick={this.handleUpdateCompressValue.bind(this, 'style.overflow', 'visible')}>2</Button>
                </Tooltip>

                {!this.props.ApplicationStore.editorProps.isReactNative &&
                <Tooltip title="Scroll">
                    <Button active={this.isStatu('scroll')}
                            onClick={this.handleUpdateCompressValue.bind(this, 'style.overflow', 'scroll')}>3</Button>
                </Tooltip>
                }

                <Tooltip title="Hidden">
                    <Button active={this.isStatu('hidden')}
                            onClick={this.handleUpdateCompressValue.bind(this, 'style.overflow', 'hidden')}>4</Button>
                </Tooltip>
            </ButtonGroup>
        )
    }

    isExpandStatu(field: string, statu: string) {
        const style = this.props.ViewportStore.currentEditComponentInfo.props.style

        // 如果值是 null，但 overflow 是对应的值，也没问题
        if (style[field] === null && style['overflow'] === statu) {
            return true
        }

        // 如果都是 null，那就是 auto
        if (style[field] === null && style['overflow'] === null) {
            return statu === 'auto'
        }

        return style[field] === statu
    }

    renderOverflowExpand() {
        return (
            <div className="expand-container">
                <ButtonGroup>
                    <Tooltip title="Auto">
                        <Button active={this.isExpandStatu('overflowX', 'auto')}
                                onClick={this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'auto')}>1</Button>
                    </Tooltip>

                    <Tooltip title="Visible">
                        <Button active={this.isExpandStatu('overflowX', 'visible')}
                                onClick={this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'visible')}>2</Button>
                    </Tooltip>

                    {!this.props.ApplicationStore.editorProps.isReactNative &&
                    <Tooltip title="Scroll">
                        <Button active={this.isExpandStatu('overflowX', 'scroll')}
                                onClick={this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'scroll')}>3</Button>
                    </Tooltip>
                    }

                    <Tooltip title="Hidden">
                        <Button active={this.isExpandStatu('overflowX', 'hidden')}
                                onClick={this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'hidden')}>4</Button>
                    </Tooltip>
                </ButtonGroup>

                <ButtonGroup>
                    <Tooltip title="Auto">
                        <Button active={this.isExpandStatu('overflowY', 'auto')}
                                onClick={this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'auto')}>1</Button>
                    </Tooltip>

                    <Tooltip title="Visible">
                        <Button active={this.isExpandStatu('overflowY', 'visible')}
                                onClick={this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'visible')}>2</Button>
                    </Tooltip>

                    {!this.props.ApplicationStore.editorProps.isReactNative &&
                    <Tooltip title="Scroll">
                        <Button active={this.isExpandStatu('overflowY', 'scroll')}
                                onClick={this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'scroll')}>3</Button>
                    </Tooltip>
                    }

                    <Tooltip title="Hidden">
                        <Button active={this.isExpandStatu('overflowY', 'hidden')}
                                onClick={this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'hidden')}>4</Button>
                    </Tooltip>
                </ButtonGroup>
            </div>
        )
    }

    render() {
        const canExpand = !this.state.expand
        const canCompress = this.state.expand && this.isOverflowXYEqual()

        return (
            <div className="_namespace">
                {this.state.expand ?
                    <div className="overflow-expend-label-container">
                        <div className="label-item">OverflowX</div>
                        <div className="label-item">OverflowY</div>
                    </div>:
                    <div>Overflow</div>
                }

                {!this.props.ApplicationStore.editorProps.isReactNative &&
                <div className="overflow-expend-button-container">
                    {canExpand &&
                    <Button onClick={this.handleExpand.bind(this)}><i className="fa fa-expand"/></Button>
                    }

                    {canCompress &&
                    <Button onClick={this.handleCompress.bind(this)}><i className="fa fa-compress"/></Button>
                    }
                </div>
                }

                <div className="operate-container">
                    {this.state.expand ? this.renderOverflowExpand() : this.renderOverflow()}
                </div>
            </div>
        )
    }
}