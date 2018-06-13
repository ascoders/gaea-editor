import { Tooltip } from 'antd';
import { Connect } from 'dob-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '../../components/icon/src';
import * as Styled from './index.style';
import { Props, State } from './index.type';

@Connect
class MainToolEditorEvent extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo;

  public render() {
    // 当前编辑组件的 key
    const instanceKey = this.props.stores.ViewportStore.currentEditInstanceKey;

    if (!this.props.stores.ViewportStore.instances.has(instanceKey)) {
      return null;
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(instanceKey);

    const Events =
      this.instanceInfo.data &&
      this.instanceInfo.data.events &&
      this.instanceInfo.data.events.map((event, index) => {
        return (
          <Styled.EventContainer key={index}>
            <Styled.EventTrigger>
              {this.props.actions.ApplicationAction.loadPluginByPosition(`mainToolEditorEventTrigger`, {
                index
              })}
            </Styled.EventTrigger>

            <Styled.EventAction>
              {this.props.actions.ApplicationAction.loadPluginByPosition(`mainToolEditorEventAction`, {
                index
              })}
            </Styled.EventAction>

            <Tooltip
              title={this.props.stores.ApplicationStore.setLocale('移除此事件', 'Remove this event')}
              placement="left"
            >
              <Styled.RemoveIconContainer onClick={this.handleRemove.bind(this, index)}>
                <Icon type="remove" size={14} />
              </Styled.RemoveIconContainer>
            </Tooltip>
          </Styled.EventContainer>
        );
      });

    return (
      <Styled.Container>
        <Styled.TabTitle>
          {this.props.stores.ApplicationStore.setLocale('事件', 'Event')}
          <Tooltip
            title={this.props.stores.ApplicationStore.setLocale('添加新事件', 'Add new event')}
            placement="right"
          >
            <Styled.AddButton onClick={this.handleAdd}>
              <Icon type="add" size={14} />
            </Styled.AddButton>
          </Tooltip>
        </Styled.TabTitle>

        <Styled.EventList>{Events}</Styled.EventList>
      </Styled.Container>
    );
  }

  private handleAdd = () => {
    this.props.actions.ViewportAction.instanceAddEvent(this.props.stores.ViewportStore.currentEditInstanceKey);
  };

  private handleRemove = (index: number) => {
    this.props.actions.ViewportAction.instanceRemoveEvent(
      this.props.stores.ViewportStore.currentEditInstanceKey,
      index
    );
  };
}

export default {
  position: 'mainToolEditorEvent',
  class: MainToolEditorEvent
};
