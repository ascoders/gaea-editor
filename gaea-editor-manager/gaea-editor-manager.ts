export {observer} from 'mobx-react'
export {action, observable} from 'mobx'
export {lazyInject} from '../gaea-editor-core/utils/kernel'
export {injectable} from 'inversify'

/**
 * 定义了自定义组件可以放在哪些位置
 */
export const positions = {
    navbarLeft: 'navbarLeft',
    navbarRight: 'navbarRight',
    mainToolTop: 'mainToolTop',
    mainToolBottom: 'mainToolBottom',
}

export {default as ApplicationAction} from '../gaea-editor-core/actions/application'
export {default as EventAction} from '../gaea-editor-core/actions/event'
export {default as ViewportAction} from '../gaea-editor-core/actions/viewport'

export {default as ApplicationStore} from '../gaea-editor-core/stores/application'
export {default as EventStore} from '../gaea-editor-core/stores/event'
export {default as ViewportStore} from '../gaea-editor-core/stores/viewport'

/**
 * 注册位置
 */
export const registerPosition = ()=> {

}