import * as React from 'react'
import * as _ from 'lodash'
import myKernel from './kernel'
import {Provider} from 'mobx-react'
import {PropsDefine as EditorPropsDefine} from '../gaea-editor.type'

import PluginGlobalSetting from '../components/global-setting/global-setting.component'
import PluginTabTools from '../components/tab-tools/tab-tools.component'
import PluginTabToolsComponents from '../components/tab-tools-components/tab-tools-components.component'
import PluginTabToolsComponentsCommon from '../components/tab-tools-components-common/tab-tools-components-common.component'
import PluginTabToolsComponentsCustom from '../components/tab-tools-components-custom/tab-tools-components-custom.component'
import PluginViewportGuideline from '../components/viewport-guideline/viewport-guideline.component'
import PluginEditorTabs from '../components/editor-tabs/editor-tabs.component'
import PluginEditorTabsAttribute from '../components/editor-tabs-attribute/editor-tabs-attribute.component'
import PluginEditorShowLayoutButton from '../components/show-layout-button/show-layout-button.component'
import PluginEditorTree from '../components/tree/tree.component'
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
import PluginEditorCrumbs from '../components/editor-crumbs/editor-crumbs.component'
import PluginEditorPreview from '../components/preview/preview.component'
import PluginEditorPublish from '../components/publish/publish.component'
import PluginEditorSave from '../components/save/save.component'

import EventAction from '../actions/event'
import ApplicationAction from '../actions/application'
import ViewportAction from '../actions/viewport'

import EventStore from '../stores/event'
import ApplicationStore from '../stores/application'
import ViewportStore from '../stores/viewport'

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
    }

    componentWillMount() {
        /**
         * 注入核心框架的数据流
         */
        const eventActionInstance = new EventAction()
        const applicationActionInstance = new ApplicationAction()
        const viewportActionInstance = new ViewportAction()

        const eventStoreInstance = new EventStore()
        const applicationStoreInstance = new ApplicationStore(this.props.gaeaProps, [
            PluginGlobalSetting,
            PluginTabTools,
            PluginTabToolsComponents,
            PluginTabToolsComponentsCommon,
            PluginTabToolsComponentsCustom,
            PluginViewportGuideline,
            PluginEditorTabs,
            PluginEditorTabsAttribute,
            PluginEditorShowLayoutButton,
            PluginEditorTree,
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
            PluginEditorCrumbs,
            PluginEditorPreview,
            PluginEditorSave,
            PluginEditorPublish
        ])
        const viewportStoreInstance = new ViewportStore()

        myKernel.bind<EventAction>(EventAction).toConstantValue(eventActionInstance)
        myKernel.bind<ApplicationAction>(ApplicationAction).toConstantValue(applicationActionInstance)
        myKernel.bind<ViewportAction>(ViewportAction).toConstantValue(viewportActionInstance)

        myKernel.bind<EventStore>(EventStore).toConstantValue(eventStoreInstance)
        myKernel.bind<ApplicationStore>(ApplicationStore).toConstantValue(applicationStoreInstance)
        myKernel.bind<ViewportStore>(ViewportStore).toConstantValue(viewportStoreInstance)

        /**
         * mobx 注入核心框架的数据流
         */
        this.providerActionAndStores = {
            applicationAction: applicationActionInstance,
            application: applicationStoreInstance,
            viewportAction: viewportActionInstance,
            viewport: viewportStoreInstance,
            eventAction: eventActionInstance,
            event: eventStoreInstance
        }

        /**
         * 注入插件数据流
         */
        applicationStoreInstance.plugins.forEach(plugin=> {
            // action 依赖注入
            if (plugin.Action) {
                const pluginActionInstance = new plugin.Action()
                myKernel.bind<any>(plugin.Action).toConstantValue(pluginActionInstance)
                this.providerActionAndStores[_.lowerFirst(pluginActionInstance.constructor.name)] = pluginActionInstance
            }
            // store 依赖注入
            if (plugin.Store) {
                const pluginStoreInstance = new plugin.Store()
                myKernel.bind<any>(plugin.Store).toConstantValue(pluginStoreInstance)
                this.providerActionAndStores[_.lowerFirst(pluginStoreInstance.constructor.name)] = pluginStoreInstance
            }
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