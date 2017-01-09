import * as React from 'react'
import * as typings from './tab-tools-components.type'
import * as classNames from 'classnames'

import Action from './action'
import Store from './store'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import {autoBindMethod} from 'nt-auto-bind'

import './tab-tools-components.scss'

@EditorManager.observer(['TabToolsComponentsStore', 'ApplicationAction', 'TabToolsComponentsAction'])
export default class TabToolsComponents extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'tabToolsComponents'
    static Action = Action
    static Store = Store

    componentWillMount() {

    }

    getTabItemClasses(activeName: string) {
        return classNames({
            'tab-item': true,
            'active': this.props.TabToolsComponentsStore.activeType === activeName
        })
    }

    @autoBindMethod handleChangeType(type: string) {
        this.props.TabToolsComponentsAction.setActiveTab(type)
    }

    render() {
        return (
            <div className="_namespace">
                <div className="left-container">
                    {this.props.TabToolsComponentsStore.activeType === 'common' && this.props.ApplicationAction.loadingPluginByPosition('tabToolsComponentsCommon')}
                    {this.props.TabToolsComponentsStore.activeType === 'custom' && this.props.ApplicationAction.loadingPluginByPosition('tabToolsComponentsCustom')}
                    {this.props.TabToolsComponentsStore.activeType === 'combo' && this.props.ApplicationAction.loadingPluginByPosition('tabToolsComponentsCombo')}
                </div>
                <div className="right-container">
                    <div className={this.getTabItemClasses('common')}
                         onClick={this.handleChangeType.bind(this, 'common')}>通用
                    </div>
                    <div className={this.getTabItemClasses('custom')}
                         onClick={this.handleChangeType.bind(this, 'custom')}>定制
                    </div>
                    <div className={this.getTabItemClasses('combo')}
                         onClick={this.handleChangeType.bind(this, 'combo')}>模板
                    </div>
                </div>
            </div>
        )
    }
}