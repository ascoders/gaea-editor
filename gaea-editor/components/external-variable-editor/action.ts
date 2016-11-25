import {
    action,
    extendObservable,
    observable,
    ApplicationAction,
    inject,
    ViewportStore,
    map,
    ViewportAction,
} from '../../../gaea-editor-manager/gaea-editor-manager'
import * as _ from 'lodash'

import ExternalVariableEditorStore from './store'

export default class ExternalVariableEditorAction {
    @inject('ExternalVariableEditorStore') private externalVariableEditorStore: ExternalVariableEditorStore
    @inject('ViewportStore') private ViewportStore: ViewportStore
    @inject('ViewportAction') private ViewportAction: ViewportAction
    @inject('ApplicationAction') private ApplicationAction: ApplicationAction

    @observable observableClass = true

    /**
     * 初始化生命周期
     */
    onInit() {
        // 拓展 setComponent
        this.ViewportAction.middlewareRegister('setComponent', (mapUniqueKey: string, componentInfo: FitGaea.ViewportComponentInfo) => {
            // gaeaVariables 初始化每项数据的 
            if (!componentInfo.props.gaeaVariables) {
                componentInfo.props.gaeaVariables = {}
            }

            // 遍历 gaeaVariables，将初始化的数据放在打平变量 store 中
            Object.keys(componentInfo.props.gaeaVariables).forEach(variableField => {
                if (componentInfo.props.gaeaVariables[variableField] !== undefined) {
                    this.externalVariableEditorStore.variables.set(mapUniqueKey + '_' + variableField, componentInfo.props.gaeaVariables[variableField])
                }
            })

            // 初始化 hideTool
            componentInfo.props.gaeaEdit = componentInfo.props.gaeaEdit.map(editInfo => {
                if (editInfo.constructor.name !== 'String') {
                    if (componentInfo.props.gaeaVariables[editInfo.field] !== undefined) {
                        editInfo.hideTool = true
                    } else {
                        editInfo.hideTool = false
                    }
                }
                return editInfo
            })

            return componentInfo
        })

        // 拓展 application 的清理 props 函数
        this.ApplicationAction.middlewareRegister('cleanComponentProps', (componentProps: FitGaea.ComponentProps) => {
            if (_.isEmpty(componentProps.gaeaVariables)) {
                delete componentProps.gaeaVariables
            }
            return componentProps
        })

        // 初始化时，把所有组件的 gaeaVariables 拿出来打平，便于监听
        // setImmediate(() => {
        //     this.ViewportStore.components.forEach((component, mapUniqueKey) => {
        //         component.props.gaeaVariables && Object.keys(component.props.gaeaVariables).map(variableField => {
        //             this.externalVariableEditorStore.variables.set(mapUniqueKey + '_' + variableField, component.props.gaeaVariables[variableField])
        //         })
        //     })
        // })
    }

    @action('设置当前编辑组件某个字段使用的变量') setCurrentEditComponentVariableByField(field: string, variable: FitGaea.VariableData) {
        this.ViewportStore.currentEditComponentInfo.props.gaeaVariables[field] = variable
        // 修改 observe 字段
        this.externalVariableEditorStore.variables.set(this.ViewportStore.currentEditComponentMapUniqueKey + '_' + field, variable)
    }

    @action('移除当前编辑组件某个字段使用的变量') removeCurrentEditComponentVariableByField(field: string) {
        delete this.ViewportStore.currentEditComponentInfo.props.gaeaVariables[field]
        this.externalVariableEditorStore.variables.delete(this.ViewportStore.currentEditComponentMapUniqueKey + '_' + field)
    }

    @action('隐藏当前编辑工具') hideCurrentEditTool(index: number) {
        this.ViewportStore.currentEditComponentInfo.props.gaeaEdit[index].hideTool = true
    }

    @action('显示当前编辑工具') showCurrentEditTool(index: number) {
        this.ViewportStore.currentEditComponentInfo.props.gaeaEdit[index].hideTool = false
    }
}