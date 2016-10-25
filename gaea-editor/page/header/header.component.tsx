import * as React from 'react'
import * as typings from './header.type'
import {observer, inject} from 'mobx-react'

import {autoBindMethod} from '../../../../../common/auto-bind/index'
import notice from '../../../../../web-common/message/index'
import Setting from './setting/setting.component'
import Publish from './publish/publish.component'
import Helper from './helper/helper.component'
import Size from './size/size.component'

import * as keymaster from 'keymaster'
import * as classNames from 'classnames'

import './header.scss'

@inject('application', 'viewport', 'setting') @observer
export default class Header extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentWillMount() {
        // 添加快捷键
        keymaster('ctrl+z, command+z', this.undo)

        keymaster('ctrl+shift+z, command+shift+z', this.redo)

        if (!this.props.application.explore) {
            keymaster('ctrl+s, command+s', this.handleSave)
        }

        keymaster('command+c, ctrl+c', this.copy)

        keymaster('command+v, ctrl+v', this.paste)

        keymaster('delete, backspace', this.del)
    }

    componentWillUnmount() {
        // 移除快捷键
        keymaster.unbind('ctrl+z, command+z')

        keymaster.unbind('ctrl+shift+z, command+shift+z')

        if (!this.props.application.explore) {
            keymaster.unbind('ctrl+s, command+s')
        }

        keymaster.unbind('command+c, ctrl+c')

        keymaster.unbind('command+v, ctrl+v')

        keymaster.unbind('delete, backspace')
    }

    /**
     * 点击保存按钮
     */
    @autoBindMethod handleSave() {
        if (this.props.application.isPreview) {
            return
        }
        // 获取增量编辑信息
        const componentsInfo = this.props.viewport.getIncrementComponentsInfo()
        this.props.application.event.emit(this.props.application.event.onSave, componentsInfo)
        return false
    }

    /**
     * 点击预览按钮
     */
    @autoBindMethod handlePreview() {
        this.props.application.setPreview(!this.props.application.isPreview)
        if (this.props.application.isPreview) {
            // 隐藏附加侧边栏
            this.props.viewport.hideSidebarAddon()
            // 取消选择状态
            if (this.props.viewport.lastSelectMapUniqueKey) {
                this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
                    mapUniqueKey: this.props.viewport.lastSelectMapUniqueKey,
                    selected: false
                })
            }
        }
    }

    /**
     * 回撤
     */
    @autoBindMethod undo() {
        if (this.props.application.isPreview) {
            return
        }
        this.props.viewport.undo()
        return false
    }

    /**
     * 重做
     */
    @autoBindMethod redo() {
        if (this.props.application.isPreview) {
            return
        }
        this.props.viewport.redo()
        return false
    }

    /**
     * 删除
     */
    @autoBindMethod del() {
        if (this.props.viewport.hoveringComponentMapUniqueKey === null) {
            return
        }
        this.props.viewport.deleteComponentByMapUniqueKeyWithHistory(this.props.viewport.hoveringComponentMapUniqueKey)
        this.props.viewport.setHoveringComponentMapUniqueKey(null)
    }

    /**
     * 复制
     */
    @autoBindMethod copy() {
        if (this.props.application.isPreview) {
            return
        }
        this.props.viewport.copy(this.props.viewport.hoveringComponentMapUniqueKey)
        return false
    }

    /**
     * 粘贴
     */
    @autoBindMethod paste() {
        if (this.props.application.isPreview) {
            return
        }
        if (!this.props.viewport.paste(this.props.viewport.hoveringComponentMapUniqueKey)) {
            notice.warning('此处无法粘贴')
        }
        return false
    }

    render() {
        const undoClasses = classNames({
            'menu-item': true,
            'operate-disable': !this.props.viewport.canUndo
        })

        const redoClasses = classNames({
            'menu-item': true,
            'operate-disable': !this.props.viewport.canRedo
        })

        return (
            <div className="_namespace"
                 height={this.props.application.headerHeight - 1}>
                <div className="left">
                    <div className="brand menu-item">{this.props.application.title}</div>
                    <Setting/>
                    <Helper/>
                </div>

                <div className="right">
                    <Size/>
                    <div className={undoClasses}
                         onClick={this.undo}><i className="fa fa-undo"/></div>
                    <div className={redoClasses}
                         onClick={this.redo}><i className="fa fa-rotate-right"/></div>
                    <div className="menu-item"
                         onClick={this.handlePreview}>{this.props.application.isPreview ? '取消' : '预览'}</div>
                    {!this.props.application.explore &&
                    <div className="menu-item"
                         onClick={this.handleSave}>保存
                    </div>
                    }
                    {!this.props.application.explore &&
                    <Publish/>
                    }
                </div>
            </div>
        )
    }
}