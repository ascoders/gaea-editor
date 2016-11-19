import * as React from 'react'
import * as typings from './tab-tools.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import {TabPanel, Tabs} from '../../../../../web-common/tabs/index'

import './tab-tools.scss'

@EditorManager.observer([])
export default class TabTools extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'mainToolTop'

    @EditorManager.lazyInject(EditorManager.ApplicationAction) private applicationAction: EditorManager.ApplicationAction

    componentWillMount() {

    }

    render() {
        return (
            <div className="_namespace">
                <Tabs defaultActiveKey="components"
                      type="retro">
                    <TabPanel tab="组件"
                              activeKey="components"
                              className="tab-panel">
                        {this.applicationAction.loadingPluginByPosition('tabToolsComponents')}
                    </TabPanel>
                    <TabPanel tab="版本"
                              activeKey="version"
                              className="tab-panel">
                        {this.applicationAction.loadingPluginByPosition('tabToolsVersion')}
                    </TabPanel>
                    <TabPanel tab="资源"
                              activeKey="resource"
                              className="tab-panel">
                        {this.applicationAction.loadingPluginByPosition('tabToolsResource')}
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}