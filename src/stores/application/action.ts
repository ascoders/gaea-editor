import { Action, inject } from 'dob';
import * as _ from 'lodash';
import * as React from 'react';
import ViewportStore from '../viewport/store';
import ApplicationStore from './store';

export default class ApplicationAction {
  @inject(ApplicationStore) private store: ApplicationStore;

  @inject(ViewportStore) private viewportStore: ViewportStore;

  @Action
  public clearPlugin() {
    this.store.plugins = [];
  }

  /**
   * 添加插件
   */
  @Action
  public addPlugin(plugin: IPlugin) {
    this.store.plugins.push(plugin);
  }

  /**
   * position 根据位置加载插件
   */
  @Action
  public loadPluginByPosition(position: string, props?: any) {
    return this.store.plugins.filter(plugin => plugin.position === position).map((plugin, index) => {
      return React.createElement(plugin.class, {
        key: index,
        ...props
      });
    });
  }

  /**
   * add component class
   */
  @Action
  public addComponentClass(componentClass: React.ComponentClass<IGaeaProps>) {
    const gaeaKey = componentClass.defaultProps.editSetting.key;
    this.store.componentClasses.set(gaeaKey, componentClass);

    // 添加这个组件的编辑配置
    this.setComponentSetting(gaeaKey, componentClass.defaultProps.editSetting);

    // 添加这个组件的 defaultProps
    this.setComponentDefaultProps(gaeaKey, componentClass.defaultProps);
  }

  /**
   * 添加组件的配置信息
   */
  @Action
  public setComponentSetting(gaeaOrPreKey: string, setting: IGaeaSetting) {
    if (!this.store.componentSetting.has(gaeaOrPreKey)) {
      this.store.componentSetting.set(gaeaOrPreKey, setting);
    } else {
      const prevSetting = this.store.componentSetting.get(gaeaOrPreKey);
      Object.assign(prevSetting, setting);
    }
  }

  /**
   * 添加组件 defaultProps
   */
  @Action
  public setComponentDefaultProps(gaeaOrPreKey: string, defaultProps: IDefaultProps) {
    if (!this.store.componentDefaultProps.has(gaeaOrPreKey)) {
      this.store.componentDefaultProps.set(gaeaOrPreKey, defaultProps);
    } else {
      const prevDefaultProps = this.store.componentDefaultProps.get(gaeaOrPreKey);
      Object.assign(prevDefaultProps, defaultProps);
    }
  }

  /**
   * get component class by gaeaKey
   */
  @Action
  public getComponentClassByKey(gaeaKey: string) {
    return this.store.componentClasses.get(gaeaKey);
  }

  /**
   * set preview
   */
  @Action
  public setPreview(isPreview: boolean) {
    this.store.isPreview = isPreview;
  }

  @Action
  public setLeftTool(name: string | null) {
    this.store.leftTool = name;
  }

  @Action
  public setRightTool(name: string | null) {
    this.store.rightTool = name;
  }

  /**
   * 弹出模态框
   */
  @Action
  public createModal(config: { title: string }, renderContent: () => React.ReactElement<any>) {
    this.store.modalTitle = config.title;
    this.store.modalContentRender = renderContent;
    this.store.isShowModal = true;
  }

  /**
   * 关闭模态框
   */
  @Action
  public closeModal() {
    this.store.isShowModal = false;
    this.store.modalTitle = null;
    this.store.modalContentRender = null;
  }

  /**
   * 渲染模态框内容
   */
  @Action
  public renderModalContent() {
    if (typeof this.store.modalContentRender === 'function') {
      return this.store.modalContentRender(this.closeModal);
    } else {
      return null;
    }
  }

  /**
   * 重置应用状态，将当前状态全部清空，适合做一些动作前清场
   */
  @Action
  public resetApplication() {
    this.store.isPreview = false;
    this.store.isShowModal = false;
    this.store.leftTool = null;
    this.store.rightTool = null;
  }

  /**
   * 设置预设组件
   */
  @Action
  public setPreComponent(gaeaKey: string, setting: IPreComponent) {
    if (!this.store.preComponents.has(gaeaKey)) {
      this.store.preComponents.set(gaeaKey, [setting]);
    } else {
      const settings = this.store.preComponents.get(gaeaKey);
      settings.push(setting);
    }
  }

  /**
   * 根据 instanceKey 获取配置
   */
  @Action
  public getSettingByInstance(instance: InstanceInfo) {
    if (this.store.componentSetting.has(instance.preGaeaKey)) {
      return this.store.componentSetting.get(instance.preGaeaKey);
    } else {
      return this.store.componentSetting.get(instance.gaeaKey);
    }
  }

  /**
   * 根据 instanceKey 获取 defaultProps
   * 辅助方法，在编辑器中调用，因此没有使用 @Action, 为了数据追踪
   */
  public getDefaultPropsByInstance(instance: InstanceInfo) {
    if (this.store.componentDefaultProps.has(instance.preGaeaKey)) {
      return this.store.componentDefaultProps.get(instance.preGaeaKey);
    } else {
      return this.store.componentDefaultProps.get(instance.gaeaKey);
    }
  }

  @Action
  public setOnComponentDragStart(fn: any) {
    this.store.onComponentDragStart = fn;
  }

  /**
   * 设置国际化信息
   */
  @Action
  public setLocale(locale: 'en' | 'zh') {
    this.store.locale = locale;
  }

  @Action
  public setViewportStyle(style: React.CSSProperties) {
    this.store.viewportStyle = style;
  }
}
