import {injectable} from 'inversify'
import {observable} from 'mobx'
import {PropsDefine} from '../gaea-editor.type'

@injectable()
export default class ApplicationStore {
    constructor(props: PropsDefine, plugins: Array<FitGaea.Plugin>) {
        this.editorProps = props

        // 拓展插件
        this.plugins = plugins.concat(props.plugins)
    }

    // 编辑器外部传参
    editorProps?: PropsDefine

    // 导航栏高度
    navbarHeight = 40

    // 插件列表
    plugins = [] as Array<FitGaea.Plugin>

    // 视图区域样式
    @observable viewportStyle: React.CSSProperties = {
        backgroundColor: 'white',
        background: null,
        backgroundImage: null
    }
}