import { Tooltip } from 'antd';
import { Connect } from 'dob-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '../../components/icon/src';
import * as S from './index.style';
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
          <S.EventContainer key={index}>
            <S.EventTrigger>
              {this.props.actions.ApplicationAction.loadPluginByPosition(`mainToolEditorEventTrigger`, {
                index
              })}
            </S.EventTrigger>

            <S.EventAction>
              {this.props.actions.ApplicationAction.loadPluginByPosition(`mainToolEditorEventAction`, {
                index
              })}
            </S.EventAction>

            <Tooltip
              title={this.props.stores.ApplicationStore.setLocale('移除此事件', 'Remove this event')}
              placement="left"
            >
              <S.RemoveIconContainer onClick={this.handleRemove.bind(this, index)}>
                <Icon type="close" size={14} />
              </S.RemoveIconContainer>
            </Tooltip>
          </S.EventContainer>
        );
      });

    return (
      <S.Container>
        <S.TabTitle>
          {this.props.stores.ApplicationStore.setLocale('事件', 'Event')}
          <Tooltip
            title={this.props.stores.ApplicationStore.setLocale('添加新事件', 'Add new event')}
            placement="right"
          >
            <S.AddButton onClick={this.handleAdd}>
              <Icon type="add" size={14} />
            </S.AddButton>
          </Tooltip>
        </S.TabTitle>

        <S.EventList>{Events}</S.EventList>
      </S.Container>
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
