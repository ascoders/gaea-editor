import { inject } from 'dob';

export class CopyPasteStore {
  public currentInstances: {
    [instanceKey: string]: InstanceInfo;
  } = null;
}
