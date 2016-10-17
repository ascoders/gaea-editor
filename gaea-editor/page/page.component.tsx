import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './page.type'
import {extendObservable} from 'mobx'
import {observer, inject} from 'mobx-react'
import * as LZString from 'lz-string'

import * as classNames from 'classnames'
import * as _ from 'lodash'
import {autoBindMethod} from '../../../../common/auto-bind/index'
import Preview from '../../../gaea-preview/index'

import LeftBar from './left-bar/left-bar.component'
import SidebarTools from './sidebar-tools/sidebar-tools.component'
import SidebarToolsPreview from './sidebar-tools-preview/sidebar-tools-preview.component'
import Footer from './footer/footer.component'
import Viewport from './viewport/viewport.component'
import ViewportSidebarResize from './viewport-sidebar-resize/viewport-sidebar-resize.component'
import HeaderNav from './header/header.component'
import SidebarAddon from './sidebar-addon/sidebar-addon.component'
import OuterMoveBox from './outer-move-box/outer-move-box.component'
import LeftAbsoluteBar from './left-absolute-bar/left-absolute-bar.component'

import './page.scss'

@inject('viewport', 'application', 'setting') @observer
export default class Page extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentWillMount() {
        let defaultValue: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
        } = {}

        if (this.props.value) {
            defaultValue = JSON.parse(LZString.decompressFromBase64(this.props.value)) as {
                [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
            }
        }

        if (_.isEmpty(defaultValue)) {
            // 如果没有 defaultValue, 生成根节点
            this.props.viewport.createRootUniqueId()
            const LayoutClass = this.props.application.getComponentByUniqueKey('gaea-layout')
            // 布置最外层的画布
            let layoutProps = extendObservable({}, _.cloneDeep(LayoutClass.defaultProps)) as FitGaea.ComponentProps
            layoutProps.style.backgroundColor = 'white'

            if (this.props.application.isReactNative) {
                layoutProps.style.flex = 1
                layoutProps.style.overflowY = 'auto'
                layoutProps.style.flexDirection = 'column'
            } else {
                layoutProps.style.flexGrow = 1
                layoutProps.style.flexDirection = 'column'
                layoutProps.style.display = 'block'
                layoutProps.style.overflow = null
                layoutProps.style.overflowX = 'hidden'
                layoutProps.style.overflowY = 'auto'
            }

            this.props.viewport.setComponents(this.props.viewport.rootMapUniqueKey, {
                props: layoutProps,
                layoutChilds: [],
                parentMapUniqueKey: null
            })
        } else {
            // 有的话, 直接用 defaultValue
            Object.keys(defaultValue).forEach(mapUniqueKey=> {
                const defaultInfo = defaultValue[mapUniqueKey]
                const ComponentClass = this.props.application.getComponentByUniqueKey(defaultInfo.props.gaeaUniqueKey)

                // 如果是根节点, 设置根据点 id
                if (defaultInfo.parentMapUniqueKey === null) {
                    this.props.viewport.setRootUniqueId(mapUniqueKey)
                }

                const props = _.merge({}, _.cloneDeep(ComponentClass.defaultProps), defaultInfo.props || {})

                this.props.viewport.setComponents(mapUniqueKey, {
                    props: extendObservable({}, props),
                    layoutChilds: defaultInfo.layoutChilds || [],
                    parentMapUniqueKey: defaultInfo.parentMapUniqueKey
                })
            })
        }
    }

    @autoBindMethod getSectionContainerRef(ref: React.ReactInstance) {
        this.props.viewport.setSectionContainerDomInstance(ReactDOM.findDOMNode(ref))
    }

    render() {
        const sectionClasses = classNames({
            'section': true,
            'section-transition': !this.props.application.isSidebarMoving,
            'preview': this.props.application.isPreview
        })

        const viewportMainContainerStyle = {
            marginLeft: this.props.viewport.leftBarType === '' ? 36 : this.props.application.leftSidebarWidth + 36,
            marginRight: this.props.viewport.isShowSidebarAddon ? this.props.application.sidebarAddonWidth : 0
        }

        const leftBarStyle = {
            width: this.props.application.leftSidebarWidth,
            left: -this.props.application.leftSidebarWidth
        }

        const rightBarStyle = {
            width: this.props.application.sidebarAddonWidth - 1,
            right: -this.props.application.sidebarAddonWidth - 1
        }

        const sectionContainerStyle = {
            height: `calc(100% - ${this.props.application.headerHeight + this.props.application.footerHeight}px)`,
            backgroundColor: this.props.setting.data.backgroundColor
        }

        const sectionContainerClass = classNames({
            'section-container': true,
            'transparent-image': this.props.setting.data.backgroundColor === 'transparent'
        })

        return (
            <div className="_namespace"
                 style={{height:this.props.application.height}}>

                <div style={{width:this.props.application.sidebarWidth}}
                     className="sidebar">
                    <SidebarTools />
                    <SidebarToolsPreview />
                    <ViewportSidebarResize />
                </div>

                <div className={sectionClasses}>
                    <HeaderNav />

                    <div className={sectionContainerClass}
                         ref={this.getSectionContainerRef}
                         style={sectionContainerStyle}>
                        <LeftAbsoluteBar/>

                        <div className="viewport-main-container"
                             style={viewportMainContainerStyle}>
                            <div className="left-bar"
                                 style={leftBarStyle}>
                                <LeftBar/>
                            </div>

                            <div className="viewport-main-content-outer">
                                <div className="viewport-main-content"
                                     style={{width: `${this.props.setting.data.viewportWidth}%`}}>
                                    <Viewport/>
                                    <OuterMoveBox/>

                                    {this.props.application.isPreview &&
                                    <div className="preview-container">
                                        <Preview value={this.props.viewport.getIncrementComponentsInfo()}
                                                 baseComponents={this.props.application.baseComponents}
                                                 customComponents={this.props.application.customComponents}/>
                                    </div>
                                    }
                                </div>
                            </div>

                            <div className="right-bar"
                                 style={rightBarStyle}>
                                <SidebarAddon/>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>

            </div>
        )
    }
}