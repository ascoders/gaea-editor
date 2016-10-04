import * as React from 'react'
import * as typings from './overflow.type'
import {observer, inject} from 'mobx-react'
import * as _ from 'lodash'

import {Button, ButtonGroup} from '../../../../../../../../web-common/button/index'
import {Tooltip} from '../../../../../../../../web-common/tooltip/index'

import './overflow.scss'

@inject('viewport') @observer
export default class EditComponentOverflow extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
        this.init(this.props)
    }

    componentWillReceiveProps(nextProps: typings.PropsDefine) {
        this.init(nextProps)
    }

    init(props: typings.PropsDefine) {
        if (this.componentInfo.props.style.overflowX === this.componentInfo.props.style.overflowY) {
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
        const style = this.componentInfo.props.style

        if (style.overflow === null && style.overflowX === null && style.overflowY === null) {
            return statu === 'auto'
        }

        return (style.overflow === statu && style.overflowX === null && style.overflowY === null) || style.overflow === null && style.overflowX === statu && style.overflowY === statu
    }

    handleUpdateCompressValue(field: string|Array<string>, value: FitGaea.ComponentPropsOptionValue) {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.updateComponentValueWithNoHistory(field, value)
        this.props.viewport.updateComponentValueWithNoHistory(['style', 'overflowX'], null)
        this.props.viewport.updateComponentValueWithNoHistory(['style', 'overflowY'], null)
        this.props.viewport.writeHistory()
    }

    handleUpdateExpandValue(field: string|Array<string>, value: FitGaea.ComponentPropsOptionValue) {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.updateComponentValueWithNoHistory(field, value)
        this.props.viewport.updateComponentValueWithNoHistory(['style', 'overflow'], null)
        this.props.viewport.writeHistory()
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
                            onClick={this.handleUpdateCompressValue.bind(this, ['style','overflow'], 'auto')}>1</Button>
                </Tooltip>

                <Tooltip title="Visible">
                    <Button active={this.isStatu('visible')}
                            onClick={this.handleUpdateCompressValue.bind(this, ['style','overflow'], 'visible')}>2</Button>
                </Tooltip>

                <Tooltip title="Scroll">
                    <Button active={this.isStatu('scroll')}
                            onClick={this.handleUpdateCompressValue.bind(this, ['style','overflow'], 'scroll')}>3</Button>
                </Tooltip>

                <Tooltip title="Hidden">
                    <Button active={this.isStatu('hidden')}
                            onClick={this.handleUpdateCompressValue.bind(this, ['style','overflow'], 'hidden')}>4</Button>
                </Tooltip>
            </ButtonGroup>
        )
    }

    isExpandStatu(field: string, statu: string) {
        const style = this.componentInfo.props.style

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
                                onClick={this.handleUpdateExpandValue.bind(this, ['style','overflowX'], 'auto')}>1</Button>
                    </Tooltip>

                    <Tooltip title="Visible">
                        <Button active={this.isExpandStatu('overflowX', 'visible')}
                                onClick={this.handleUpdateExpandValue.bind(this, ['style','overflowX'], 'visible')}>2</Button>
                    </Tooltip>

                    <Tooltip title="Scroll">
                        <Button active={this.isExpandStatu('overflowX', 'scroll')}
                                onClick={this.handleUpdateExpandValue.bind(this, ['style','overflowX'], 'scroll')}>3</Button>
                    </Tooltip>

                    <Tooltip title="Hidden">
                        <Button active={this.isExpandStatu('overflowX', 'hidden')}
                                onClick={this.handleUpdateExpandValue.bind(this, ['style','overflowX'], 'hidden')}>4</Button>
                    </Tooltip>
                </ButtonGroup>

                <ButtonGroup>
                    <Tooltip title="Auto">
                        <Button active={this.isExpandStatu('overflowY', 'auto')}
                                onClick={this.handleUpdateExpandValue.bind(this, ['style','overflowY'], 'auto')}>1</Button>
                    </Tooltip>

                    <Tooltip title="Visible">
                        <Button active={this.isExpandStatu('overflowY', 'visible')}
                                onClick={this.handleUpdateExpandValue.bind(this, ['style','overflowY'], 'visible')}>2</Button>
                    </Tooltip>

                    <Tooltip title="Scroll">
                        <Button active={this.isExpandStatu('overflowY', 'scroll')}
                                onClick={this.handleUpdateExpandValue.bind(this, ['style','overflowY'], 'scroll')}>3</Button>
                    </Tooltip>

                    <Tooltip title="Hidden">
                        <Button active={this.isExpandStatu('overflowY', 'hidden')}
                                onClick={this.handleUpdateExpandValue.bind(this, ['style','overflowY'], 'hidden')}>4</Button>
                    </Tooltip>
                </ButtonGroup>
            </div>
        )
    }

    render() {
        const canExpand = !this.state.expand
        const canCompress = this.state.expand && this.componentInfo.props.style.overflowX === this.componentInfo.props.style.overflowY

        return (
            <div className="_namespace">
                {this.state.expand ?
                    <div className="overflow-expend-label-container">
                        <div className="label-item">OverflowX</div>
                        <div className="label-item">OverflowY</div>
                    </div>:
                    <div>Overflow</div>
                }

                <div className="overflow-expend-button-container">
                    {canExpand &&
                    <Button onClick={this.handleExpand.bind(this)}><i className="fa fa-expand"/></Button>
                    }

                    {canCompress &&
                    <Button onClick={this.handleCompress.bind(this)}><i className="fa fa-compress"/></Button>
                    }
                </div>

                <div className="operate-container">
                    {this.state.expand ? this.renderOverflowExpand() : this.renderOverflow()}
                </div>
            </div>
        )
    }
}