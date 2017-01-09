import * as React from 'react'
import * as typings from './editor-tabs.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { TabPanel, Tabs } from '../../../../../web-common/tabs/index'

import './editor-tabs.scss'

@EditorManager.observer(['ViewportStore', 'EditorEventStore', 'ApplicationAction'])
export default class EditorTabs extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editor'

    render() {
        if (this.props.ViewportStore.showEditComponents === false) {
            return null
        }

        const attributeName = this.props.EditorEventStore.currentEditPropsIndex === null ? '属性' : '修改属性'

        return (
            <Tabs defaultActiveKey="attribute"
                className="_namespace"
                type="retro">
                <TabPanel tab={attributeName}
                    activeKey="attribute"
                    className="tab-panel">
                    {this.props.ApplicationAction.loadingPluginByPosition('editorAttribute')}
                </TabPanel>
                <TabPanel tab="事件"
                    activeKey="event"
                    className="tab-panel">
                    {this.props.ApplicationAction.loadingPluginByPosition('editorEvent')}
                </TabPanel>
            </Tabs>
        )
    }
}