import { observable, Static } from 'dob';
import * as React from 'react';

@observable
export default class ApplicationStore {
  /**
   * Navbar height
   */
  public navbarHeight = 40;
  /**
   * Is in preview
   */
  public isPreview = false;
  /**
   * Viewport parent container's style
   */
  public viewportContainerStyle = {};
  /**
   * Viewport style
   */
  public viewportStyle: React.CSSProperties = {};
  /**
   * All gaea plugins
   */
  public plugins?: IPlugin[] = [];
  /**
   * All component's class
   * key: component's name
   * value: component's class
   */
  public componentClasses = new Map<string, React.ComponentClass<IGaeaProps>>();
  /**
   * 所有组件的编辑属性 GaeaProps
   * key: gaeaKey | preGaeaKey
   */
  public componentSetting = new Map<string, IGaeaSetting>();
  /**
   * 所有组件 defaultProps
   * key: gaeaKey | preGaeaKey
   */
  public componentDefaultProps = new Map<string, IDefaultProps>();
  /**
   * Viewport's initialization data
   */
  public defaultValue?: any = null;
  /**
   * Viewport root component's name
   */
  public rootComponentName = '';
  /**
   * left tool name
   */
  public leftTool: string = null;
  public rightTool: string = null;
  /**
   * Show modal?
   */
  public isShowModal = false;
  public modalTitle = '';
  public modalContentRender: (closeModal?: () => void) => React.ReactElement<any> = null;
  /**
   * 预设组件
   * 将一个组件加入此配置，这个组件会从组件列表中移除，并根据配置的 props 信息展示为 N 个独立组件
   * 在显示时，这个组件与普通组件别无二致，只是会加上默认配置，并且这个配置可以不在[可编辑配置中]
   * key: gaeaKey
   */
  public preComponents = new Map<string, IPreComponent[]>();

  /**
   * GaeaEditor props: onComponentDragStart
   */
  public onComponentDragStart: IOnComponentDragStart = Static(() => null as any);

  /**
   * Locale
   */
  public locale?: 'zh' | 'en' = null;

  public setLocale = (zh: string, en: string) => {
    switch (this.locale) {
      case 'zh':
        return zh;
      case 'en':
        return en;
      default:
        return null;
    }
  };
}
