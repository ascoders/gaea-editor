import { Select, Tooltip } from 'antd';
import { Connect } from 'dob-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '../../components/icon/src';
import * as S from './index.style';
import { Props, State } from './index.type';

const triggerOptions = [
  {
    key: 'init',
    value: 'Init'
  },
  {
    key: 'subscribe',
    value: 'Listen event'
  }
];

@Connect
class MainToolEditorEventTrigger extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo;

  /**
   * 设置
   */
  private setting: IGaeaSetting;

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

    // 当前事件数据
    if (!this.instanceInfo.data.events) {
      return null;
    }

    this.currentEventInfo = this.instanceInfo.data.events[this.props.index];

    if (!this.currentEventInfo) {
      return null;
    }

    this.setting = this.props.actions.ApplicationAction.getSettingByInstance(this.instanceInfo);

    const mergedTriggerOptions = triggerOptions.concat(
      (this.setting.events || []).map((event, index) => {
        return { key: `callback-${event.field}`, value: event.text };
      })
    );
    const MergedTriggerOptions = mergedTriggerOptions.map((each, index) => {
      return (
        <Select.Option key={index} value={each.key}>
          {each.value}
        </Select.Option>
      );
    });

    return (
      <S.Container>
        <S.HeaderContainer>
          <S.Label>{this.props.stores.ApplicationStore.setLocale('触发', 'Trigger')}</S.Label>
          <Select value={this.currentEventInfo.trigger.type} onSelect={this.handleChangeTrigger as any}>
            {MergedTriggerOptions}
          </Select>
        </S.HeaderContainer>

        <S.BodyContainer>{this.renderTriggerBody()}</S.BodyContainer>
      </S.Container>
    );
  }

  private handleChangeTrigger = (value: string) => {
    let type = value;
    let field = '';

    if (type.startsWith('callback-')) {
      field = type.slice(9);
      type = 'callback';
    }

    const eventInfo: InstanceInfoEvent = {
      // Refresh trigger and triggerData only.
      ...this.currentEventInfo,
      trigger: {
        type: type as any
      }
    };

    switch (type) {
      case 'callback':
        (eventInfo.trigger as InstanceEventTriggerCallback).field = field;
        break;
      default:
    }

    this.props.actions.ViewportAction.instanceSetEvent(
      this.props.stores.ViewportStore.currentEditInstanceKey,
      this.props.index,
      eventInfo
    );

    return;
  };

  private renderTriggerBody = () => {
    switch (this.currentEventInfo.trigger.type) {
      case 'init':
        return null;
      case 'callback':
        return null;
      case 'subscribe':
        return (
          <S.DataContainer>
            <Select
              style={{ width: '100%' }}
              mode="multiple"
              placeholder={this.props.stores.ApplicationStore.setLocale('事件名称', 'Event name')}
              value={this.currentEventInfo.trigger.name}
              onSelect={this.handleChangeTriggerData.bind(this, 'name')}
            />
          </S.DataContainer>
        );
      default:
        return null;
    }
  };

  private handleChangeTriggerData = (key: string, value: string) => {
    this.props.actions.ViewportAction.setInstanceEvent(
      this.props.stores.ViewportStore.currentEditInstanceKey,
      `${this.props.index}.trigger.${key}`,
      value
    );
  };
}

export default {
  position: 'mainToolEditorEventTrigger',
  class: MainToolEditorEventTrigger
};
