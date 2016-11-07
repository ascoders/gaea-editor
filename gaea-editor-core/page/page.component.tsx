import * as React from 'react'
import * as typings from './page.type'

import {observer} from 'mobx-react'

import {autoBindMethod} from '../../../../common/auto-bind/index'

import './page.scss'

@observer(['application', 'applicationAction'])
export default class Page extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        return (
            <div className="_namespace">
                <div className="outer-left-container">
                    <div className="navbar-container"
                         style={{height:this.props.application.navbarHeight}}>
                        {this.props.applicationAction.loadingPluginByPosition('navbarLeft')}
                    </div>
                    <div className="navbar-center-container">
                        <div className="navbar-bottom__left-container">

                        </div>
                        <div className="navbar-bottom__right-container">
                            <div className="viewport-container"
                                 style={Object.assign({}, this.props.application.viewportStyle)}>
                                55
                            </div>
                        </div>
                    </div>
                    <div className="navbar-bottom-container">
                        3
                    </div>
                </div>
                <div className="outer-right-container">
                    <div className="outer-right__top-container">
                        {this.props.applicationAction.loadingPluginByPosition('mainToolTop')}
                    </div>
                    <div className="outer-right__bottom-container">
                        {this.props.applicationAction.loadingPluginByPosition('mainToolBottom')}
                    </div>
                </div>
            </div>
        )
    }
}