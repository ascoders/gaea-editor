import { inject } from "dob"

export class GlobalSettingsStore {

}

export class GlobalSettingsAction {
    @inject(GlobalSettingsStore)
    private store: GlobalSettingsStore
}
