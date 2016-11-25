import { observable, ApplicationStore, map } from '../../../gaea-editor-manager/gaea-editor-manager'

export default class ExternalVariableEditorStore {
    @observable variables = map<FitGaea.VariableData>()
}