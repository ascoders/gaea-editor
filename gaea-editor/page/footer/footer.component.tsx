import * as React from 'react'
import * as typings from './footer.type'
import {observer, inject} from 'mobx-react'

import {autoBindMethod} from '../../../../../common/auto-bind/index'

import './footer.scss'

@inject('application', 'viewport')
@observer
export default class Footer extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @autoBindMethod handleClick(mapUniqueKey: string) {
        this.props.viewport.setCurrentEditComponentMapUniqueKey(mapUniqueKey)
    }

    render() {
        let childs: Array<React.ReactElement<any>>

        if (this.props.viewport.currentEditComponentMapUniqueKey) {
            // 递归寻找这个组件父元素
            const paths = this.props.viewport.findComponentPathFromRoot(this.props.viewport.currentEditComponentMapUniqueKey)
            paths.unshift(this.props.viewport.rootMapUniqueKey)
            childs = paths.map((mapUniqueKey, index)=> {
                const componentInfo = this.props.viewport.components.get(mapUniqueKey)
                return (
                    <div onClick={this.handleClick.bind(this, mapUniqueKey)}
                         className="footer-item"
                         key={index}>
                        {componentInfo.props.gaeaName}

                        <div className="right-icon-container">
                            <div className="right-icon"></div>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div className="_namespace"
                 style={{height:this.props.application.footerHeight}}>
                {childs}
            </div>
        )
    }
}