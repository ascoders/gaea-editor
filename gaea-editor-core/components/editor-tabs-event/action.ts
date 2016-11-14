import {
    injectable,
    action,
    transaction,
    lazyInject,
    ViewportStore,
    ApplicationAction,
    ViewportAction,
    observable,
    extendObservable
} from '../../../gaea-editor-manager/gaea-editor-manager'

import EventStore from './store'

@injectable()
export default class EventAction {
    @lazyInject(EventStore) private eventStore: EventStore
    @lazyInject(ViewportStore) private viewport: ViewportStore
    @lazyInject(ApplicationAction) private applicationAction: ApplicationAction
    @lazyInject(ViewportAction) private viewportAction: ViewportAction

    @action('新增一个事件') addEvent(mapUniqueKey: string, isWeb: boolean) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)

        const eventData: FitGaea.EventData = {
            type: 'init',
            event: 'none',
            typeIndex: -1,
            eventIndex: -1
        }

        // data 虽然开始定义没有，但在页面新建实例会自动创建，否则就无法绑定。所以此处肯定存在 data
        if (isWeb) {
            componentInfo.props.gaeaEventData.push(eventData)
        } else {
            componentInfo.props.gaeaNativeEventData.push(eventData)
        }
    }

    @action('删除一个事件') removeEvent(mapUniqueKey: string, index: number, isWeb: boolean) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)

        if (isWeb) {
            componentInfo.props.gaeaEventData.splice(index, 1)
        } else {
            componentInfo.props.gaeaNativeEventData.splice(index, 1)
        }
    }

    @action('更新事件触发条件') updateEventTriggerCondition(mapUniqueKey: string, dataIndex: number, typeIndex: string, isWeb: boolean) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)
        const eventDataName = isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'

        if (isNaN(Number(typeIndex))) {
            transaction(()=> {
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.type`, typeIndex)
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.typeIndex`, -1)
            })

            switch (typeIndex) {
                case 'listen':
                    _.set(componentInfo.props, `${eventDataName}.${dataIndex}.typeData`, observable({
                        listen: ''
                    }))
                    break
            }
            return
        }

        const eventType = componentInfo.props.gaeaEvent.types[Number(typeIndex)]

        transaction(()=> {
            _.set(componentInfo.props, `${eventDataName}.${dataIndex}.type`, eventType.type)
            _.set(componentInfo.props, `${eventDataName}.${dataIndex}.typeIndex`, Number(typeIndex))
        })
    }

    @action('更新事件触发动作') updateEventAction(mapUniqueKey: string, dataIndex: number, eventIndex: string, isWeb: boolean) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)
        const eventDataName = isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'

        if (isNaN(Number(eventIndex))) {
            transaction(()=> {
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.event`, eventIndex)
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.eventIndex`, -1)
            })

            switch (eventIndex) {
                case 'emit':
                    _.set(componentInfo.props, `${eventDataName}.${dataIndex}.eventData`, observable({
                        emit: ''
                    }))
                    break
            }
            return
        }

        const eventAction = componentInfo.props.gaeaEvent.events[Number(eventIndex)]
        transaction(()=> {
            _.set(componentInfo.props, `${eventDataName}.${dataIndex}.event`, eventAction.event)
            _.set(componentInfo.props, `${eventDataName}.${dataIndex}.eventIndex`, Number(eventIndex))
        })

        // 初始化 gaeaEvent.data
        switch (eventAction.event) {
            case 'jumpUrl':
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.eventData`, observable({
                    url: ''
                }))
                break
            case 'call':
                let fields: {
                    [key: string]: any
                } = {}
                eventAction.call.param && eventAction.call.param.forEach(param=> {
                    fields[param.field] = null as any
                })
                _.set(componentInfo.props, `${eventDataName}.${dataIndex}.eventData`, observable(fields))
                break
        }
    }

    @action('更新事件数据') updateEventData(mapUniqueKey: string, field: string, value: any) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)
        _.set(componentInfo.props, field, value)
    }

    @action('获取所有 event 事件名列表') getEventListName() {
        const eventList: Array<string> = []
        this.viewport.components.forEach(component=> {
            component.props.gaeaEventData.forEach(eventData=> {
                if (eventData.event === 'emit') {
                    eventList.push((eventData.eventData as FitGaea.EventActionEvent).emit)
                }
            })
        })
        return eventList
    }

    @action('将事件配置复制一份给 native') copyEventToNative(mapUniqueKey: string) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)
        componentInfo.props.gaeaNativeEventData = observable(JSON.parse(JSON.stringify(componentInfo.props.gaeaEventData))) as any
    }

    @action('删除 native 的事件配置') removeNativeEvent(mapUniqueKey: string) {
        const componentInfo = this.viewport.components.get(mapUniqueKey)
        componentInfo.props.gaeaNativeEventData = observable([])
    }

    @action('设置当前编辑是第几个属性') setCurrentEditPropsIndex(index: number, eventProps?: FitGaea.ComponentProps, currentEditIsWeb?: boolean, eventIndex?: number) {
        const componentInfo = this.viewport.components.get(this.viewport.currentEditComponentMapUniqueKey)

        // 要给组件赋的值
        let componentProps: FitGaea.ComponentProps = null

        if (index !== null) {
            this.eventStore.currentEditIsWeb = currentEditIsWeb
            this.eventStore.currentEditEventIndex = eventIndex
            // 设置了一个新的关键帧
            // 临时保存编辑组件的 props
            if (this.eventStore.currentEditPropsIndex === null) {
                // 如果当前编辑 props 索引是空才赋值，为了避免在已点击的情况下，又点击了另一个，覆盖了原来属性
                this.eventStore.temporaryOriginProps = this.applicationAction.cleanComponentProps(componentInfo.props)
            }
            // 将事件 props 赋值上
            componentProps = extendObservable({}, this.viewportAction.completionEditProps(this.applicationAction.expendComponentProps(eventProps))) as FitGaea.ComponentProps
        } else {
            // 取消关键帧
            // 还原组件的 props
            componentProps = extendObservable({}, this.viewportAction.completionEditProps(this.applicationAction.expendComponentProps(this.eventStore.temporaryOriginProps))) as FitGaea.ComponentProps
            this.eventStore.temporaryOriginProps = null
        }

        // 覆盖当前编辑的索引
        this.eventStore.currentEditPropsIndex = index

        // 只覆盖非 gaea 开头的属性
        componentProps && Object.keys(componentProps).forEach(key=> {
            if (!_.startsWith(key, 'gaea')) {
                componentInfo.props[key] = componentProps[key]
            }
        })
    }
}