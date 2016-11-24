import {
    action,
    extendObservable,
    observable,
    ApplicationAction,
    inject,
    ViewportStore
} from '../../../gaea-editor-manager/gaea-editor-manager'

import ExternalVariableEditorStore from './store'

export default class ExternalVariableEditorAction {
    @inject('ExternalVariableEditorStore') private externalVariableEditorStore: ExternalVariableEditorStore
    @inject('ViewportStore') private ViewportStore: ViewportStore

    @observable observableClass = true

    @action('设置当前编辑组件某个字段使用的变量') setCurrentEditComponentVariableByField(field: string, variable: FitGaea.VariableData) {
        this.ViewportStore.currentEditComponentInfo.props.gaeaVariables.set(field, variable)
    }

    @action('移除当前编辑组件某个字段使用的变量') removeCurrentEditComponentVariableByField(field: string) {
        delete this.ViewportStore.currentEditComponentInfo.props.gaeaVariables.delete[field]
    }
}