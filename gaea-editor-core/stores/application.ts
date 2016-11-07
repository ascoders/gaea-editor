import {injectable} from 'inversify'
import {observable} from 'mobx'

import {PropsDefine} from '../gaea-editor.type'

import PluginGlobalSetting from '../components/global-setting/global-setting.component'
import PluginTabTools from '../components/tab-tools/tab-tools.component'
import PluginTabToolsComponents from '../components/tab-tools-components/tab-tools-components.component'
import PluginTabToolsComponentsCommon from '../components/tab-tools-components-common/tab-tools-components-common.component'

@injectable()
export default class ApplicationStore {
    constructor(props: PropsDefine) {
        this.editorProps = props

        // 拓展插件
        this.editorProps.plugins.forEach(plugin=> {
            this.plugins.push(plugin)
        })
    }

    // 编辑器外部传参
    editorProps?: PropsDefine

    // 导航栏高度
    navbarHeight = 40

    // 插件列表
    plugins = [
        PluginGlobalSetting,
        PluginTabTools,
        PluginTabToolsComponents,
        PluginTabToolsComponentsCommon
    ] as Array<FitGaea.Plugin>

    // 视图区域样式
    @observable viewportStyle: React.CSSProperties = {
        backgroundColor: 'white',
        background: null,
        backgroundImage: null
    }
}