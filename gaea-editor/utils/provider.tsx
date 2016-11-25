import * as React from 'react'
import { Provider } from 'mobx-react'
import { PropsDefine as EditorPropsDefine } from '../gaea-editor.type'
import * as _ from 'lodash'
import injectInstance from '../../../../common/inject-instance/index'

import PluginGlobalSetting from '../components/global-setting/global-setting.component'
import PluginTabTools from '../components/tab-tools/tab-tools.component'
import PluginTabToolsComponents from '../components/tab-tools-components/tab-tools-components.component'
import PluginTabToolsComponentsCommon from '../components/tab-tools-components-common/tab-tools-components-common.component'
import PluginTabToolsComponentsCustom from '../components/tab-tools-components-custom/tab-tools-components-custom.component'
import PluginTabToolsComponentsCombo from '../components/tab-tools-components-combo/tab-tools-components-combo.component'
import PluginTabToolsVersion from '../components/tab-tools-version/tab-tools-version.component'
import PluginViewportGuideline from '../components/viewport-guideline/viewport-guideline.component'
import PluginShowLayoutButton from '../components/show-layout-button/show-layout-button.component'
import PluginTree from '../components/tree/tree.component'
import PluginEditorTabs from '../components/editor-tabs/editor-tabs.component'
import PluginEditorTabsAttribute from '../components/editor-tabs-attribute/editor-tabs-attribute.component'
import PluginEditorAttributeText from '../components/editor-attribute-text/editor-attribute-text.component'
import PluginEditorAttributeNumber from '../components/editor-attribute-number/editor-attribute-number.component'
import PluginEditorAttributeBackground from '../components/editor-attribute-background/editor-attribute-background.component'
import PluginEditorAttributeBorder from '../components/editor-attribute-border/editor-attribute-border.component'
import PluginEditorAttributeFont from '../components/editor-attribute-font/editor-attribute-font.component'
import PluginEditorAttributeInstance from '../components/editor-attribute-instance/editor-attribute-instance.component'
import PluginEditorAttributeLayout from '../components/editor-attribute-layout/editor-attribute-layout.component'
import PluginEditorAttributeMarginPadding from '../components/editor-attribute-margin-padding/editor-attribute-margin-padding.component'
import PluginEditorAttributeOverflow from '../components/editor-attribute-overflow/editor-attribute-overflow.component'
import PluginEditorAttributePosition from '../components/editor-attribute-position/editor-attribute-position.component'
import PluginEditorAttributeSelect from '../components/editor-attribute-select/editor-attribute-select.component'
import PluginEditorAttributeSwitch from '../components/editor-attribute-switch/editor-attribute-switch.component'
import PluginEditorAttributeWidthHeight from '../components/editor-attribute-width-height/editor-attribute-width-height.component'
import PluginEditorPreview from '../components/preview/preview.component'
import PluginEditorPublish from '../components/publish/publish.component'
import PluginEditorSave from '../components/save/save.component'
import PluginEditorTabsEvent from '../components/editor-tabs-event/editor-tabs-event.component'
import PluginCopyPaste from '../components/copy-paste/copy-paste.component'
import PluginCrumbs from '../components/crumbs/crumbs.component'
import PluginDelete from '../components/delete/delete.component'
import PluginViewportSize from '../components/viewport-size/viewport-size.component'
import PluginExternalVariableButton from '../components/external-variable-button/external-variable-button.component'
import PluginExternalVariable from '../components/external-variable/external-variable.component'
import PluginExternalVariableEditor from '../components/external-variable-editor/external-variable-editor.component'
import PluginExternalVariableEditorLabel from '../components/external-variable-editor-label/external-variable-editor-label.component'

import EventAction from '../actions/event'
import ApplicationAction from '../actions/application'
import ViewportAction from '../actions/viewport'

import EventStore from '../stores/event'
import ApplicationStore from '../stores/application'
import ViewportStore from '../stores/viewport'

const pluginList: Array<FitGaea.Plugin> = [
    PluginGlobalSetting,
    PluginTabTools,
    PluginTabToolsComponents,
    PluginTabToolsComponentsCommon,
    PluginTabToolsComponentsCustom,
    PluginTabToolsComponentsCombo,
    PluginTabToolsVersion,
    PluginViewportGuideline,
    PluginShowLayoutButton,
    PluginTree,
    PluginEditorTabs,
    PluginEditorTabsAttribute,
    PluginEditorAttributeText,
    PluginEditorAttributeNumber,
    PluginEditorAttributeBackground,
    PluginEditorAttributeBorder,
    PluginEditorAttributeFont,
    PluginEditorAttributeInstance,
    PluginEditorAttributeLayout,
    PluginEditorAttributeMarginPadding,
    PluginEditorAttributeOverflow,
    PluginEditorAttributePosition,
    PluginEditorAttributeSelect,
    PluginEditorAttributeSwitch,
    PluginEditorAttributeWidthHeight,
    PluginViewportSize,
    PluginEditorPreview,
    PluginEditorSave,
    PluginEditorPublish,
    PluginEditorTabsEvent,
    PluginCopyPaste,
    PluginCrumbs,
    PluginDelete,
    PluginExternalVariableButton,
    PluginExternalVariable,
    PluginExternalVariableEditor,
    PluginExternalVariableEditorLabel
]

export interface ProviderContainerProps {
    /**
     * 编辑器外部传参
     */
    gaeaProps?: EditorPropsDefine
}

/**
 * 生成 Provider
 */
export default class ProviderContainer extends React.Component<ProviderContainerProps, any> {
    private providerActionAndStores: {
        [injectName: string]: any
    } = {}

    componentWillMount() {
        const pluginActionStores: Array<any> = []
        const pluginActions = pluginList.forEach(plugin => {
            if (plugin.Action) {
                pluginActionStores.push(plugin.Action)
            }
            if (plugin.Store) {
                pluginActionStores.push(plugin.Store)
            }
        })

        /**
         * 注入核心框架的数据流
         */
        const instances = injectInstance(EventAction, ApplicationAction, ViewportAction, EventStore, ApplicationStore, ViewportStore, ...pluginActionStores)

        instances.forEach(instance => {
            if (_.endsWith(instance.constructor.name, 'Action')) {
                // 执行 onInit 生命周期
                instance.onInit && instance.onInit()
            }
        })

        instances.get('ApplicationStore').init(this.props.gaeaProps, pluginList)

        /**
         * mobx 注入核心框架的数据流
         */
        instances.forEach((value, key) => {
            this.providerActionAndStores[key] = value
        })
    }

    render() {
        return (
            <Provider {...this.providerActionAndStores}>
                {this.props.children}
            </Provider>
        )
    }
}