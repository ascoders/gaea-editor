/**
 * Viewport's component instance info
 */
declare interface InstanceInfo {
  /**
   * Gaea key, use it can find componentClass, and access defaultProps.editSetting
   */
  gaeaKey: string;
  /**
   * 预设组件专有属性，实例化 componentClass 还是根据 gaeaKey 找，但是配置会优先根据 preGaeaKey 找
   */
  preGaeaKey?: string;
  /**
   * Component data, all operate save here
   */
  data: {
    /**
     * Merge to props
     */
    props?: {
      [prop: string]: any;
    };
    /**
     * Event data
     */
    events?: InstanceInfoEvent[];
  };
  /**
   * Children's instanceKey（only isContainer)
   * Component who's property isContainer is false will not have the property
   */
  childs?: string[];
  /**
   * Parent component's instanceKey
   * Root component's parentInstanceKey is null
   */
  parentInstanceKey: string;
  /**
   * 哪些 props 字段使用的是变量
   * eg: key: style.backgroundColor
   */
  variables?: {
    [realField: string]: InstanceInfoVariable;
  };
}

/**
 * 编辑字段使用变量的描述
 */
declare interface InstanceInfoVariable {
  /**
   * 什么类型，比如从：全局、url参数、当前层级
   */
  type: InstanceInfoVariableType;
  /**
   * 取值的唯一 key
   * 之所以不用 name，因为可能被修改
   */
  key: string;
}

declare type InstanceInfoVariableType = 'global' | 'urlParam' | 'sibling';

declare interface IDragInfo {
  /**
   * Drag from application menu or viewport or a combo component?
   */
  type: 'new' | 'viewport' | 'combo';
  dragStartParentDom: HTMLElement;
  dragStartIndex: number;
  info: IDragInfoNew | IDragInfoViewport;
}

declare interface IDragInfoNew {
  gaeaKey?: string;
  /**
   * 预设 props
   */
  props?: any;
  /**
   * 预设 gaeaKey
   */
  preGaeaKey?: string;
  targetInstanceKey?: string;
  targetIndex?: number;
}

declare interface IDragInfoViewport {
  /**
   * Current drag instance key
   */
  instanceKey?: string;
  /**
   * Drag target instance key
   */
  targetInstanceKey?: string;
  /**
   * Index where drag to
   */
  targetIndex?: number;
}

/**
 * full viewport information
 */
declare interface IFullInformation {
  [instanceKey: string]: InstanceInfo;
}
