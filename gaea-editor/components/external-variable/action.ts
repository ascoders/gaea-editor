import {
    action,
    transaction,
    inject,
    ViewportStore,
    ApplicationAction,
    ViewportAction,
    observable,
    extendObservable
} from '../../../gaea-editor-manager/gaea-editor-manager'

import GlobalSettingStore from '../global-setting/store'

import ExternalVariableStore from './store'

export default class ExternalVariableAction {
    @inject('ExternalVariableStore') private externalVariableStore: ExternalVariableStore
    @inject('GlobalSettingStore') private globalSettingStore: GlobalSettingStore

    @observable observeClass = true

    @action('增加外部传参') addExternalParameter(externalParameter: FitGaea.ExternalParameter) {
        this.globalSettingStore.externalParameter.push(externalParameter)
    }

    @action('删除外部传参') removeExternalParameter(index: number) {
        this.globalSettingStore.externalParameter.splice(index, 1)
    }
}