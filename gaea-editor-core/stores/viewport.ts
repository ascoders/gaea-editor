import {injectable} from 'inversify'
import {observable, computed, map, transaction, ObservableMap, extendObservable, action} from 'mobx'

@injectable()
export default class ViewportStore {
    // 视图区域所有组件集合
    @observable components = map<FitGaea.ViewportComponentInfo>()

    // 根节点唯一标识
    @observable rootMapUniqueKey: string
}