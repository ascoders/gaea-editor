import { computed, inject } from '../../../gaea-editor-manager/gaea-editor-manager'
import GlobalSettingStore from '../global-setting/store'

export default class ExternalVariableStore {
  @inject('GlobalSettingStore') private globalSettingStore: GlobalSettingStore

  /**
    * 外部传参
    */
  @computed get externalParameter(): Array<FitGaea.ExternalParameter> {
    return this.globalSettingStore.externalParameter
  }
}