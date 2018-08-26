/**
 * Plugin
 */
declare interface IPlugin {
  /**
   * Position insert to editor
   */
  position: string;
  /**
   * React class
   */
  class: any;
  /**
   * Plugin's action
   */
  actions?: {
    [name: string]: any;
  };
  /**
   * Plugin's store
   */
  stores?: {
    [name: string]: any;
  };
}

/**
 * Drag source's props should extends this interface
 */
declare interface IGaeaProps extends React.HTMLProps<any> {
  editSetting: IGaeaSetting;
}

declare interface IGaeaSetting {
  /**
   * Unique key
   */
  key: string;
  /**
   * Custom show name
   */
  name: string;
  /**
   * Edit infos
   */
  editors?: Array<string | IEditor>;
  /**
   * Is in preview mode
   */
  isPreview?: boolean;
  /**
   * Container can be dragged into component
   */
  isContainer?: boolean;
  /**
   * 自定义事件
   * 组件设置的事件，只支持回调事件
   */
  events?: Array<{
    text: string;
    field: string;
  }>;
}

declare interface IDefaultProps {
  [key: string]: any;
}

declare interface IEditor {
  /**
   * Which field to control?
   * EX. text, size, user.nickname
   */
  field: string;
  /**
   * Which Editor want to show?
   * Basic type like `string` `number`, or custom editor like `layout`
   */
  type: string;
  /**
   * Show label
   */
  text: string;
  /**
   * 特殊类型的额外描述信息
   */
  data?: IEditor[] | IEditor | IEditorNumberData | IEditorSelectData | number | string;
}

declare interface IEditorNumberData {
  /**
   * 是否使用滑块
   */
  useSlider?: boolean;
  /**
   * 滑块、输入框步长
   */
  step: number;
  /**
   * 输入范围
   */
  inputRange: number[];
  /**
   * 输出范围
   */
  outputRange?: number[];
}

declare type IEditorSelectData = Array<{
  /**
   * 选择框展示的 label
   */
  text: string;
  /**
   * 选择框真正的值
   */
  value: string;
}>;

declare interface IPage {
  /**
   * Can create a folder or page
   */
  type: 'page' | 'folder';
  /**
   * Is home page
   */
  isHomePage?: boolean;
  /**
   * description name
   */
  name: string;
  /**
   * Real path
   */
  path: string;
  parentKey: string;
  /**
   * Only exist in folder
   */
  childs?: string[];
}

declare interface IPages {
  [pageKey: string]: IPage;
}

declare type InstancesArray = Array<{
  /**
   * The page instances belong to
   */
  pageKey: string;
  instances: {
    [instanceKey: string]: InstanceInfo;
  };
}>;

declare interface IPreComponent {
  /**
   * gaea Key
   */
  name: string;
  /**
   * Pre-setting props
   */
  props: any;
}

declare type IOnComponentDragStart = (
  gaeaKeyOrPreGaeaKey?: string
) => Promise<IOnComponentDragStartReturn> | IOnComponentDragStartReturn;

declare interface IOnComponentDragStartReturn {
  setting: any;
  props: any;
}
