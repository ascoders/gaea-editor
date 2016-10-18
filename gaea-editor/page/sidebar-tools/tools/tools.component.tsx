import * as React from 'react'
import * as typings from './tools.type'
import {observer, inject} from 'mobx-react'

import {Tabs, TabPanel} from '../../../../../../web-common/tabs/index'

import Components from './components/components.component'
import Version from './version/version.component'
import Source from './source/source.component'

import './tools.scss'

@inject('application') @observer
export default class Tools extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        if (!this.props.application.explore){
            return (
                <Tabs defaultActiveKey="components"
                      type="retro"
                      className="_namespace">
                    <TabPanel tab="组件"
                              activeKey="components"
                              className="tab-panel">
                        <Components/>
                    </TabPanel>
                    <TabPanel tab="版本"
                              activeKey="version"
                              className="tab-panel">
                        <Version/>
                    </TabPanel>
                    <TabPanel tab="资源"
                              activeKey="resource"
                              className="tab-panel">
                        <Source/>
                    </TabPanel>
                </Tabs>
            )
        }else{
            return (
                <Tabs defaultActiveKey="components"
                      type="retro"
                      className="_namespace">
                    <TabPanel tab="组件"
                              activeKey="components"
                              className="tab-panel">
                        <Components/>
                    </TabPanel>
                    <TabPanel tab="资源"
                              activeKey="resource"
                              className="tab-panel">
                        <Source/>
                    </TabPanel>
                </Tabs>
            )
        }
    }
}