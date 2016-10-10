import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './edit-box.type'
import {observer, inject} from 'mobx-react'

import {autoBindMethod} from '../../../../../common/auto-bind/index'
import {Tabs, TabPanel} from '../../../../../web-common/tabs/index'

import Basic from './basic/basic.component'
import Event from './event/event.component'
import Script from './script/script.component'

import './edit-box.scss'

@inject('application', 'viewport') @observer
export default class EditBox extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    private domInstance: Element

    componentDidMount() {
        this.domInstance = ReactDOM.findDOMNode(this)
    }

    /**
     * 点击关闭按钮
     */
    @autoBindMethod handleCloseClick() {
        this.props.viewport.cancelEditComponent()
    }

    /**
     * 遮罩层被点击
     */
    handleShadowClick() {
        this.props.viewport.setShowEditorPanelShadow(false)
    }

    render() {
        if (this.props.viewport.currentEditComponentMapUniqueKey === null) {
            return null
        }

        const itemStyle = {
            height: `calc(100% - ${this.props.application.footerHeight}px)`,
            flexGrow: 0
        }

        return (
            <div className="_namespace container-box">
                        <span className="handle-drag-close"
                              onClick={this.handleCloseClick}>x</span>

                {this.props.viewport.showEditorPanelShadow && <div className="shadow-container"
                                                                  onClick={this.handleShadowClick.bind(this)}/>}

                <Tabs defaultActiveKey="basic"
                      type="retro"
                      className="edit-box-handle">
                    <TabPanel tab="基础"
                              style={itemStyle}
                              activeKey="basic"
                              className="edit-container">
                        <Basic/>
                    </TabPanel>
                    <TabPanel tab="脚本"
                              style={itemStyle}
                              activeKey="script"
                              className="edit-container">
                        <Script/>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}