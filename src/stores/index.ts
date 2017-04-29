import { Container } from "dependency-inject"
import * as React from "react"
import ApplicationAction from "./application/action"
import ApplicationStore from "./application/store"
import ViewportAction from "./viewport/action"
import ViewportStore from "./viewport/store"

export interface IActionsOrStores {
    [x: string]: any
}

export class StoreProps {
    public actions?: {
        ApplicationAction: ApplicationAction
        ViewportAction: ViewportAction
    }
    public stores?: {
        ApplicationStore: ApplicationStore
        ViewportStore: ViewportStore
    }
}

export class Store {
    private container = new Container()

    private actions: IActionsOrStores = {}
    private stores: IActionsOrStores = {}

    constructor() {
        this.container = new Container()

        this.container.set(ApplicationAction, new ApplicationAction())
        this.container.set(ApplicationStore, new ApplicationStore())

        this.container.set(ViewportAction, new ViewportAction())
        this.container.set(ViewportStore, new ViewportStore())

        this.actions["ApplicationAction"] = this.container.get(ApplicationAction)
        this.stores["ApplicationStore"] = this.container.get(ApplicationStore)

        this.actions["ViewportAction"] = this.container.get(ViewportAction)
        this.stores["ViewportStore"] = this.container.get(ViewportStore)
    }

    public addActions(actions: IActionsOrStores) {
        Object.keys(actions).forEach((key) => {
            this.container.set(actions[key], new actions[key]())
            this.actions[key] = this.container.get(actions[key])
        })
    }

    public addStores(stores: IActionsOrStores) {
        Object.keys(stores).forEach((key) => {
            this.container.set(stores[key], new stores[key]())
            this.stores[key] = this.container.get(stores[key])
        })
    }

    /**
     * 获得 store
     */
    public getStore() {
        return {
            actions: this.actions,
            stores: this.stores,
        }
    }
}
