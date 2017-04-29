import { inject } from "dependency-inject"

export class GlobalSettingsStore {

}

export class GlobalSettingsAction {
    @inject(GlobalSettingsStore)
    private store: GlobalSettingsStore
}
