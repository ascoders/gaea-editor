import * as React from 'react'
import * as typings from './tab-tools.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import {TabPanel, Tabs} from 'nt-web-tabs'

import './tab-tools.scss'

@EditorManager.observer(['ApplicationAction'])
export default class TabTools extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'mainToolTop'

    render() {
        return (
            <div className="_namespace">
                <Tabs defaultActiveKey="components"
                      type="retro">
                    <TabPanel tab="组件"
                              activeKey="components"
                              className="tab-panel">
                        {this.props.ApplicationAction.loadingPluginByPosition('tabToolsComponents')}
                    </TabPanel>
                    <TabPanel tab="版本"
                              activeKey="version"
                              className="tab-panel">
                        {this.props.ApplicationAction.loadingPluginByPosition('tabToolsVersion')}
                    </TabPanel>
                    <TabPanel tab="资源"
                              activeKey="resource"
                              className="tab-panel">
                        {this.props.ApplicationAction.loadingPluginByPosition('tabToolsResource')}
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}