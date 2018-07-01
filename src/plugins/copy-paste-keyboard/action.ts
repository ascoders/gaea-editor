import { Action, inject } from 'dob';
import * as _ from 'lodash';
import ApplicationAction from '../../stores/application/action';
import ViewportAction from '../../stores/viewport/action';
import ViewportStore from '../../stores/viewport/store';
import { CopyPasteStore } from './store';

export class CopyPasteAction {
  @inject(CopyPasteStore) private copyPasteStore: CopyPasteStore;
  @inject(ViewportAction) private viewportAction: ViewportAction;
  @inject(ViewportStore) private viewportStore: ViewportStore;
  @inject(ApplicationAction) private applicationAction: ApplicationAction;

  @Action
  public copyCurrentHoverInstance() {
    if (!this.viewportStore.currentHoverInstanceKey) {
      return;
    }

    this.copyPasteStore.currentInstances = {};

    const allChilds = this.viewportAction.getAllChilds(this.viewportStore.currentHoverInstanceKey);

    allChilds.forEach(instanceKey => {
      this.copyPasteStore.currentInstances[instanceKey] = _.cloneDeep(
        (this.viewportStore.instances.get(instanceKey) as any).$raw
      );
    });

    this.copyPasteStore.currentInstances[this.viewportStore.currentHoverInstanceKey] = {
      ...(this.viewportStore.instances.get(this.viewportStore.currentHoverInstanceKey) as any).$raw,
      parentInstanceKey: null
    };
  }

  @Action
  public pasteToCurrentHoverInstance() {
    if (!this.viewportStore.currentHoverInstanceKey) {
      return;
    }

    if (this.copyPasteStore.currentInstances === null) {
      return;
    }

    const currentHoverInstanceInfo = this.viewportStore.instances.get(this.viewportStore.currentHoverInstanceKey);

    // If not container
    if (!this.viewportAction.getInstanceProps(this.viewportStore.currentHoverInstanceKey, 'editSetting.isContainer')) {
      return;
    }

    const pasteInstances: { [instanceKey: string]: InstanceInfo } = {};

    // Generate new instance keys for copy instances.
    const instanceKeysMap = new Map<string, string>();
    Object.keys(this.copyPasteStore.currentInstances).forEach(oldInstanceKey => {
      const newInstanceKey = this.viewportAction.createNewInstanceKey(Array.from(instanceKeysMap.values()));
      instanceKeysMap.set(oldInstanceKey, newInstanceKey);
      pasteInstances[newInstanceKey] = { ...this.copyPasteStore.currentInstances[oldInstanceKey] };
    });

    // Replace pasteInstances keys
    Object.keys(pasteInstances).forEach(instanceKey => {
      const instanceInfo = pasteInstances[instanceKey];
      if (instanceInfo.parentInstanceKey) {
        instanceInfo.parentInstanceKey = instanceKeysMap.get(instanceInfo.parentInstanceKey);
      }
    });

    const rootInstanceKey = Object.keys(pasteInstances).find(
      instanceKey => !pasteInstances[instanceKey].parentInstanceKey
    );

    // Replace root instance parentKey
    pasteInstances[rootInstanceKey].parentInstanceKey = this.viewportStore.currentHoverInstanceKey;

    // Add instances
    Object.keys(pasteInstances).forEach(instanceKey => {
      const instanceInfo = pasteInstances[instanceKey];
      this.viewportStore.instances.set(instanceKey, _.cloneDeep(instanceInfo));
    });

    // Add child for hover instance
    this.viewportStore.instances.get(this.viewportStore.currentHoverInstanceKey).childs.push(rootInstanceKey);
  }
}
