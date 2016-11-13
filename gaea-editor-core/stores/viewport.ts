import {injectable} from 'inversify'
import {observable, computed, map, transaction, ObservableMap, extendObservable, action} from 'mobx'

@injectable()
export default class ViewportStore {
    // 视图区域所有组件集合
    @observable components = map<FitGaea.ViewportComponentInfo>()

    // 视图区域 dom 集合
    componentDomInstances = new Map<string,HTMLElement>()

    // 根节点唯一标识
    @observable rootMapUniqueKey: string = null

    // 视图区域 dom 节点
    viewportDom: HTMLElement = null

    // 当前鼠标 hover 元素的 uniqueKey
    @observable currentHoverComponentMapUniqueKey: string = null

    // 当前鼠标 hover 元素的 dom
    @computed get currentHoverComponentDom() {
        return this.componentDomInstances.get(this.currentHoverComponentMapUniqueKey)
    }

    // 当前编辑元素的 uniqueKey
    @observable currentEditComponentMapUniqueKey: string = null

    // 当前编辑元素
    @computed get currentEditComponentInfo() {
        return this.components.get(this.currentEditComponentMapUniqueKey)
    }

    // 是否显示编辑组件
    @observable showEditComponents = false

    // 布局元素是否高亮
    @observable isLayoutComponentActive = false

    // 当前拖拽元素信息
    @observable currentDragComponentInfo: FitGaea.CurrentDragComponentInfo = null

    // 当前编辑元素的寻找路径
    @computed get currentEditComponentPath() {
        let finderPath: Array<string> = [this.currentEditComponentMapUniqueKey]

        if (this.currentEditComponentMapUniqueKey === null) {
            return [] as Array<string>
        }

        let nowComponent = this.components.get(this.currentEditComponentMapUniqueKey)

        // 如果已经是根元素, 直接返回空数组
        if (nowComponent.parentMapUniqueKey === null) {
            return [this.rootMapUniqueKey]
        }

        // 直到父级是根元素为止
        while (this.components.get(nowComponent.parentMapUniqueKey).parentMapUniqueKey !== null) {
            finderPath.unshift(nowComponent.parentMapUniqueKey)
            nowComponent = this.components.get(nowComponent.parentMapUniqueKey)
        }

        finderPath.unshift(this.rootMapUniqueKey)

        return finderPath
    }
}