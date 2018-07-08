declare interface InstanceInfoEvent {
  trigger: InstanceEventTriggerInit | InstanceEventTriggerSubscribe | InstanceEventTriggerCallback;
  action:
    | InstanceEventActionNone
    | InstanceEventActionEmit
    | InstanceEventActionPassingSiblingNodes
    | InstanceEventActionJump;
}

/**
 * Triggers
 */

declare interface InstanceEventTriggerInit {
  type: 'init';
}

declare interface InstanceEventTriggerSubscribe {
  type: 'subscribe';
  name: string;
}

declare interface InstanceEventTriggerCallback {
  type: 'callback';
  /**
   * Callback field.
   */
  field?: string;
}

/**
 * Actions
 */

declare interface InstanceEventActionNone {
  type: 'none';
}

declare interface InstanceEventActionEmit {
  type: 'emit';
  name: string;
}

declare interface InstanceEventActionJump {
  type: 'jump';
  url: string;
}

declare interface InstanceEventActionPassingSiblingNodes {
  type: 'passingSiblingNodes';
}
