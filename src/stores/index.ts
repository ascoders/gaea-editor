import { Container } from "dependency-inject"
import * as React from "react"
import ApplicationAction from "./application/action"
import ApplicationStore from "./application/store"
import EventAction from "./event/action"
import EventStore from "./event/store"
import ViewportAction from "./viewport/action"
import ViewportStore from "./viewport/store"

export interface IActionsOrStores {
    [x: string]: any
}

export class StoreProps<Actions, Stores> {
    public actions?: {
        ApplicationAction: ApplicationAction
        ViewportAction: ViewportAction
        EventAction: EventAction
    } & Actions
    public stores?: {
        ApplicationStore: ApplicationStore
        ViewportStore: ViewportStore
        EventStore: EventStore
    } & Stores
}

export class Store {
    private container = new Container()

    private actions: IActionsOrStores = {}
    private stores: IActionsOrStores = {}

    /**
     * 全局 actions + stores 映射
     */
    private allActions = new Map<string, any>()
    private allStores = new Map<string, any>()

    constructor() {
        this.container = new Container()

        this.allActions.set("ApplicationAction", ApplicationAction)
        this.allStores.set("ApplicationStore", ApplicationStore)
        this.allActions.set("ViewportAction", ViewportAction)
        this.allStores.set("ViewportStore", ViewportStore)
        this.allActions.set("EventAction", EventAction)
        this.allStores.set("EventStore", EventStore)

        this.allActions.forEach((actionClass, actionName) => {
            this.container.set(actionClass, new actionClass())
        })

        this.allStores.forEach((storeClass, storeName) => {
            this.container.set(storeClass, new storeClass())
        })
    }

    public addActions(actions: IActionsOrStores) {
        Object.keys(actions).forEach((key) => {
            this.container.set(actions[key], new actions[key]())
            this.allActions.set(key, actions[key])
        })
    }

    public addStores(stores: IActionsOrStores) {
        Object.keys(stores).forEach((key) => {
            this.container.set(stores[key], new stores[key]())
            this.allStores.set(key, stores[key])
        })
    }

    /**
     * 获得 store
     */
    public getStore() {
        this.allActions.forEach((actionClass, actionName) => {
            this.actions[actionName] = this.container.get(actionClass)
        })
        this.allStores.forEach((storeClass, storeName) => {
            this.stores[storeName] = this.container.get(storeClass)
        })

        return {
            actions: this.actions,
            stores: this.stores,
        }
    }
}
