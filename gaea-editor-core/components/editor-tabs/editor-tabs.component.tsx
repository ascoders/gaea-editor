import * as React from 'react'
import * as typings from './editor-tabs.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import {TabPanel, Tabs} from '../../../../../web-common/tabs/index'

import './editor-tabs.scss'

@EditorManager.observer(['applicationAction'])
export default class EditorTabs extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editor'

    render() {
        return (
            <Tabs defaultActiveKey="attribute"
                  className="_namespace"
                  type="retro">
                <TabPanel tab="属性"
                          activeKey="attribute"
                          className="tab-panel">
                    {this.props.applicationAction.loadingPluginByPosition('editorAttribute')}
                </TabPanel>
                <TabPanel tab="事件"
                          activeKey="event"
                          className="tab-panel">
                    {this.props.applicationAction.loadingPluginByPosition('editorEvent')}
                </TabPanel>
            </Tabs>
        )
    }
}