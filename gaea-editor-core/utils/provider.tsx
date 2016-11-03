import * as React from 'react'
import myKernel from './kernel'
import {Provider} from 'mobx-react'

import EventAction from '../actions/event'
import ApplicationAction from '../actions/application'

import EventStore from '../stores/event'
import ApplicationStore from '../stores/application'

/**
 * 生成 Provider
 */
export default class ProviderContainer extends React.Component<any, any> {
    private providerActionAndStores: {
        [injectName: string]: any
    }

    componentWillMount() {
        // 创建 action 和 store 的实例
        const eventActionInstance = new EventAction()
        const applicationActionInstance = new ApplicationAction()

        const eventStoreInstance = new EventStore()
        const applicationStoreInstance = new ApplicationStore()

        /**
         * 数据流依赖注入
         */
        myKernel.bind<EventAction>(EventAction).toConstantValue(eventActionInstance)
        myKernel.bind<ApplicationAction>(ApplicationAction).toConstantValue(applicationActionInstance)

        myKernel.bind<EventStore>(EventStore).toConstantValue(eventStoreInstance)
        myKernel.bind<ApplicationStore>(ApplicationStore).toConstantValue(applicationStoreInstance)

        this.providerActionAndStores = {
            applicationAction: applicationActionInstance,
            application: applicationStoreInstance,
            eventAction: eventActionInstance,
            event: eventStoreInstance
        }
    }

    render() {
        return (
            <Provider {...this.providerActionAndStores}>
                {this.props.children}
            </Provider>
        )
    }
}