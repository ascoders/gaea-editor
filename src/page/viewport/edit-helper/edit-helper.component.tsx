import { observe } from 'dob';
import { Connect } from 'dob-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addClass, hasClass, removeClass } from '../../../utils/dom';
import * as Style from './edit-helper.style';
import { Props, State } from './edit-helper.type';

// 注入全局样式，辅助编辑器
Style.injectGlob();

/**
 * 一个辅助编辑状态的外壳，内部包裹实际渲染的组件
 */
class EditHelper extends React.Component<Props, State> {
  public static defaultProps = new Props();

  public state = new State();

  /**
   * 暴露内层组件实例
   */
  public wrappedInstance: React.ReactInstance;

  /**
   * 组件的类
   */
  private componentClass: React.ComponentClass<IGaeaProps>;

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo;

  /**
   * 当前组件 dom 对象
   */
  private domInstance: HTMLElement;

  /**
   * 当前实例设置信息
   */
  private setting: IGaeaSetting;

  /**
   * 当前实例默认配置
   */
  private defaultProps: IDefaultProps;

  /**
   * 是否在高亮中
   */
  private isInHighlight = false;

  public componentWillMount() {
    this.instanceInfo = this.props.stores.ViewportStore.instances.get(this.props.instanceKey);
    this.componentClass = this.props.actions.ApplicationAction.getComponentClassByKey(this.instanceInfo.gaeaKey);
    this.setting = this.props.actions.ApplicationAction.getSettingByInstance(this.instanceInfo);
    this.defaultProps = this.props.actions.ApplicationAction.getDefaultPropsByInstance(this.instanceInfo);
  }

  public componentDidMount() {
    this.domInstance = ReactDOM.findDOMNode(this.wrappedInstance) as HTMLElement;

    // 绑定监听
    this.domInstance.addEventListener('mouseover', this.handleMouseOver);
    this.domInstance.addEventListener('click', this.handleClick);

    this.setLayoutClassIfCanDragIn();

    addClass(this.domInstance, 'gaea-draggable');

    // 设置此实例的 dom 节点
    this.props.actions.ViewportAction.setDomInstance(this.props.instanceKey, this.domInstance);

    // 如果自己是布局元素, 给子元素绑定 sortable
    if (this.setting.isContainer) {
      // 添加可排序拖拽
      this.props.actions.ViewportAction.registerInnerDrag(this.props.instanceKey, this.domInstance, {
        draggable: '.gaea-draggable'
      });
    }

    // 当组件 props 设置改变时，会触发，强制刷新
    this.props.actions.EventAction.on(
      `${this.props.stores.EventStore.instanceUpdate}.${this.props.instanceKey}`,
      this.forceRender
    );

    // 监听当前编辑 key，如果不是自己，则取消高亮
    observe(() => {
      if (this.props.stores.ViewportStore.currentEditInstanceKey !== this.props.instanceKey) {
        this.cancelHighlight();
      }
    });
  }

  public componentWillUnmount() {
    this.props.actions.EventAction.off(
      `${this.props.stores.EventStore.instanceUpdate}.${this.props.instanceKey}`,
      this.forceRender
    );
  }

  public forceRender = () => {
    this.forceUpdate();
  };

  public handleMouseOver = (event: MouseEvent) => {
    event.stopPropagation();

    this.props.actions.EventAction.emit(this.props.stores.EventStore.mouseHoveringComponent, {
      instanceKey: this.props.instanceKey,
      type: 'instance'
    });

    this.props.actions.ViewportAction.setCurrentHoverInstanceKey(this.props.instanceKey);
  };

  public handleClick = (event: MouseEvent) => {
    event.stopPropagation();

    // 将当前组件设置为正在编辑状态
    this.props.actions.ViewportAction.setCurrentEditInstanceKey(this.props.instanceKey);

    this.setHighlight();
  };

  /**
   * 如果是布局容器，且不是最外层元素，添加 gaea-layout class，用于添加布局样式
   */
  public setLayoutClassIfCanDragIn = () => {
    if (this.setting.isContainer && this.instanceInfo.parentInstanceKey !== null) {
      addClass(this.domInstance, 'gaea-container');
    }
  };

  public render() {
    // 子元素
    let childs: Array<React.ReactElement<any>> = null;

    // 布局元素可以有子元素
    if (this.setting.isContainer) {
      childs = this.instanceInfo.childs.map(childKey => {
        return <ConnectedEditHelper key={childKey} instanceKey={childKey} />;
      });
    }

    const wrapProps: any = _.merge(
      {},
      this.defaultProps,
      { ...this.instanceInfo.data.props },
      {
        ref: (ref: React.ReactInstance) => {
          this.wrappedInstance = ref;
        }
      }
    );

    return React.createElement(this.componentClass, wrapProps, childs);
  }

  private setHighlight = () => {
    if (this.isInHighlight) {
      return;
    }

    addClass(this.domInstance, 'gaea-highlight');

    this.isInHighlight = true;
  };

  private cancelHighlight = () => {
    if (!this.isInHighlight) {
      return;
    }

    removeClass(this.domInstance, 'gaea-highlight');

    this.isInHighlight = false;
  };
}

const ConnectedEditHelper = Connect(EditHelper);
export default ConnectedEditHelper;
