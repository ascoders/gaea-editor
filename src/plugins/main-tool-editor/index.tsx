import { Button, Tooltip } from 'antd';
import { Connect } from 'dob-react';
import * as React from 'react';
import * as Styled from './index.style';
import { Props, State } from './index.type';

@Connect
class MainToolEditor extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  /**
   * 组件的类
   */
  private componentClass: React.ComponentClass<IGaeaProps>;

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo;

  /**
   * 组件的编辑信息
   */
  private setting: IGaeaSetting;

  public render() {
    // 当前编辑组件的 key
    const instanceKey = this.props.stores.ViewportStore.currentEditInstanceKey;

    if (!instanceKey) {
      return (
        <Styled.EmptyContainer>
          <Styled.EmptyTitle>
            {this.props.stores.ApplicationStore.setLocale('没有选择的组件', 'No component selected')}
          </Styled.EmptyTitle>
          <Styled.EmptyDescription>
            {this.props.stores.ApplicationStore.setLocale(
              '在屏幕左侧点击一个组件',
              'Click one component in the left of the screen.'
            )}
          </Styled.EmptyDescription>
        </Styled.EmptyContainer>
      );
    }

    if (!this.props.stores.ViewportStore.instances.has(instanceKey)) {
      return null;
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(instanceKey);

    this.componentClass = this.props.actions.ApplicationAction.getComponentClassByKey(this.instanceInfo.gaeaKey);

    // 优先从 preGaeaKey 取配置，因为可能是一个预设组件
    this.setting = this.props.actions.ApplicationAction.getSettingByInstance(this.instanceInfo);

    return (
      <Styled.Container>
        <Styled.Nav>
          <Styled.Name>{this.setting.name}</Styled.Name>
          <Styled.RightContainer>
            {this.instanceInfo.parentInstanceKey !== null && (
              <Tooltip title={this.props.stores.ApplicationStore.setLocale('删除此实例', 'Delete this instance')}>
                <Button shape="circle" icon="delete" onClick={this.removeCurrentInstance} />
              </Tooltip>
            )}
          </Styled.RightContainer>
        </Styled.Nav>
        {this.renderEditor(this.setting)}
      </Styled.Container>
    );
  }

  private renderEditor(setting: IGaeaSetting) {
    if (!this.setting || !this.setting.editors || this.setting.editors.length === 0) {
      return (
        <Styled.EmptyContainer>
          <Styled.EmptyTitle>
            {this.props.stores.ApplicationStore.setLocale('无编辑信息', 'No edit info')}
          </Styled.EmptyTitle>
          <Styled.EmptyDescription>
            {this.props.stores.ApplicationStore.setLocale(
              '该组件还未添加编辑信息，',
              'This component has no edit info yet,'
            )}
            <a href="https://github.com/ascoders/gaea-editor" target="_blank">
              {this.props.stores.ApplicationStore.setLocale('点击了解如何添加', 'Click to know learn it')}
            </a>
          </Styled.EmptyDescription>
        </Styled.EmptyContainer>
      );
    }

    return [
      this.props.actions.ApplicationAction.loadPluginByPosition('mainToolEditorManager'),
      this.props.actions.ApplicationAction.loadPluginByPosition('mainToolEditorEvent'),
      this.props.actions.ApplicationAction.loadPluginByPosition('mainToolEditorAddon')
    ];
  }

  private removeCurrentInstance = () => {
    this.props.actions.ViewportAction.removeInstance(this.props.stores.ViewportStore.currentEditInstanceKey);
  };
}

export default {
  position: 'mainToolEditor',
  class: MainToolEditor
};
