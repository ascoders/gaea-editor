import GaeaComponents from 'gaea-basic-components';

export class Props {
  /**
   * React class you want to drag with.
   */
  public componentClasses?: Array<React.ComponentClass<IGaeaProps>> = GaeaComponents;
  /**
   * Trigger when onSave button clicked.
   */
  public onSave?: (value?: IFullInformation) => void;
  /**
   * Default value.
   */
  public defaultValue?: IFullInformation = null;
  /**
   * Custom plugins include jsx and stores.
   */
  public plugins?: IPlugin[] = [];
  /**
   * Locale
   */
  public locale?: 'zh' | 'en' = 'zh';
  /**
   * You can rewrite viewport element.
   */
  public ViewportRender?: React.ReactElement<any>;
  /**
   * 组件被拖拽起来时的回调，你可以填充 props 为即将渲染的组件。
   * 也可以发请求获取数据再填充到 props，只要返回一个 promise，编辑器会等到返回数据再执行组件渲染
   */
  public onComponentDragStart?: IOnComponentDragStart = () => null;
}

export class State {}
