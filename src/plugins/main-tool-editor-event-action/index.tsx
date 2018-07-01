import { Input, Select, Tooltip } from 'antd';
import { Connect } from 'dob-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '../../components/icon/src';
import { pipeEvent } from '../../utils/functional';
import * as S from './index.style';
import { Props, State } from './index.type';

// TODO:
const SelectAny = Select as any;

const ActionOptions = [
  {
    key: 'none',
    value: 'Do nothing'
  },
  {
    key: 'emit',
    value: 'Trigger Event'
  },
  {
    key: 'jump',
    value: 'Jump url'
  }
  // {
  //   key: 'passingSiblingNodes',
  //   value: 'Pass value to brother node'
  // }
].map((each, index) => {
  return (
    <Select.Option key={index} value={each.key}>
      {each.value}
    </Select.Option>
  );
});

@Connect
class MainToolEditorEventAction extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo;

  /**
   * 当前事件数据
   */
  private currentEventInfo: InstanceInfoEvent = null;

  public render() {
    // 当前编辑组件的 key
    const instanceKey = this.props.stores.ViewportStore.currentEditInstanceKey;

    if (!this.props.stores.ViewportStore.instances.has(instanceKey)) {
      return null;
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(instanceKey);

    if (!this.instanceInfo.data.events) {
      return null;
    }

    this.currentEventInfo = this.instanceInfo.data.events[this.props.index];

    if (!this.currentEventInfo) {
      return null;
    }

    return (
      <S.Container>
        <S.HeaderContainer>
          <S.Label>{this.props.stores.ApplicationStore.setLocale('动作', 'Action')}</S.Label>
          <Select value={this.currentEventInfo.action.type} onChange={this.handleChangeAction as any}>
            {ActionOptions}
          </Select>
        </S.HeaderContainer>

        <S.BodyContainer>{this.renderActionBody()}</S.BodyContainer>
      </S.Container>
    );
  }

  private handleChangeAction = (value: string) => {
    this.props.actions.ViewportAction.instanceSetEvent(
      this.props.stores.ViewportStore.currentEditInstanceKey,
      this.props.index,
      {
        ...this.currentEventInfo,
        action: {
          type: value as any
        }
      }
    );
  };

  private renderActionBody = () => {
    switch (this.currentEventInfo.action.type) {
      case 'emit':
        return (
          <S.DataContainer>
            <SelectAny
              style={{ width: '100%' }}
              mode="combobox"
              defaultActiveFirstOption={false}
              value={this.currentEventInfo.action.name}
              showArrow={false}
              filterOption={false}
              placeholder={this.props.stores.ApplicationStore.setLocale('事件名称', 'Event name')}
              onChange={this.handleChangeActionData.bind(this, 'name')}
            />
          </S.DataContainer>
        );
      case 'passingSiblingNodes':
        return null;
      case 'jump':
        return (
          <S.DataContainer>
            <Input
              placeholder={this.props.stores.ApplicationStore.setLocale('URL 路径', 'URL path')}
              value={this.currentEventInfo.action.url}
              onChange={pipeEvent(this.handleChangeActionData.bind(this, 'url'))}
            />
          </S.DataContainer>
        );
      case 'none':
      default:
        return null;
    }
  };

  private handleChangeActionData = (key: string, value: string) => {
    this.props.actions.ViewportAction.setInstanceEvent(
      this.props.stores.ViewportStore.currentEditInstanceKey,
      `${this.props.index}.action.${key}`,
      value
    );
  };
}

export default {
  position: 'mainToolEditorEventAction',
  class: MainToolEditorEventAction
};
