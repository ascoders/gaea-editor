import { observable, ApplicationStore, map } from '../../../gaea-editor-manager/gaea-editor-manager'
import { ObservableMap } from 'mobx'

export default class ExternalVariableEditorStore {
    @observable variables: ObservableMap<FitGaea.VariableData> = map<FitGaea.VariableData>()
}