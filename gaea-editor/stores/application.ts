import {inject} from '../../../../common/inject-instance/index'
import {observable} from 'mobx'
import {PropsDefine} from '../gaea-editor.type'
import * as _ from 'lodash'

export default class ApplicationStore {
    /**
     * 初始化数据
     */
    init(props: PropsDefine, plugins: Array<FitGaea.Plugin>) {
        this.editorProps = props

        // 如果有自定义插件配置，就将配置聚合在插件上
        if (this.editorProps.customOptions) {
            this.customComponents = this.editorProps.customComponents.filter(ComponentClass => {
                // 先把非类的清除
                if (!ComponentClass.name) {
                    return false
                }

                // 不在配置里的排除
                if (!this.editorProps.customOptions[ComponentClass.name]) {
                    return false
                }
                return true
            }).map(ComponentClass => {
                if (!ComponentClass.defaultProps) {
                    ComponentClass.defaultProps = {} as any
                }
                ComponentClass.defaultProps = _.merge(ComponentClass.defaultProps, this.editorProps.customOptions[ComponentClass.name])
                return ComponentClass
            })
        }

        // 拓展插件
        this.plugins = plugins.concat(props.plugins)

        // 设置页面初始信息
        this.pageValue = this.editorProps.defaultValue || null
    }

    // 自定义组件，因为有配置就会修改 props，所以都用这份拷贝的
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>> = []

    // 编辑器外部传参
    editorProps?: PropsDefine

    // 导航栏高度
    navbarHeight = 41

    // 插件列表
    plugins = [] as Array<FitGaea.Plugin>

    // 页面信息
    @observable pageValue: string = 'empty'

    // 视图区域样式
    @observable viewportStyle: React.CSSProperties = {
        backgroundColor: 'white',
        background: null,
        backgroundImage: null,
        width: null,
        height: null,
        flexGrow: 1
    }

    // 视图区域容器样式
    @observable viewportContainerStyle: React.CSSProperties = {
        backgroundColor: 'transparent'
    }

    // 是否在预览模式
    @observable inPreview = false
}