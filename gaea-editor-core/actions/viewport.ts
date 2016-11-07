import {injectable} from 'inversify'
import {action} from 'mobx'
import ViewportStore from '../stores/viewport'
import {lazyInject} from '../utils/kernel'

@injectable()
export default class ViewportAction {
    @lazyInject(ViewportStore) private viewport: ViewportStore

    @action('设置根节点唯一标识') setRootMapUniqueKey(mapUniqueKey: string) {
        this.viewport.rootMapUniqueKey = mapUniqueKey
    }

    @action('新增元素') addComponent() {

    }

    @action('移除元素') removeComponent() {

    }
}