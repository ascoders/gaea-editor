export {observer, inject} from 'mobx-react'
export {action, observable, computed, transaction, extendObservable} from 'mobx'
export {lazyInject} from '../gaea-editor/utils/kernel'
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

export {default as ApplicationAction} from '../gaea-editor/actions/application'
export {default as EventAction} from '../gaea-editor/actions/event'
export {default as ViewportAction} from '../gaea-editor/actions/viewport'

export {default as ApplicationStore} from '../gaea-editor/stores/application'
export {default as EventStore} from '../gaea-editor/stores/event'
export {default as ViewportStore} from '../gaea-editor/stores/viewport'