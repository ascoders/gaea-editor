import * as React from 'react'
import Application from '../../../../store/application'
import Viewport from '../../../../store/viewport'

export interface PropsDefine {
    application?: Application
    viewport?: Viewport
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 选中组件类别
     */
    selectedType?: string

    /**
     * 点击导出的组件信息
     */
    exportComponentInfo?: FitGaea.ComboComponentInfo

    /**
     * 是否显示导出模态框
     */
    showExportModal?: boolean
}

export class State implements StateDefine {
    selectedType = 'custom'
}