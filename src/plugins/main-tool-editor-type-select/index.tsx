import { Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { Connect } from 'dob-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Styled from './index.style';
import { Props, State } from './index.type';

@Connect
class MainToolEditorSelect extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo;

  public render() {
    if (!this.props.stores.ViewportStore.instances.has(this.props.stores.ViewportStore.currentEditInstanceKey)) {
      return null;
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(
      this.props.stores.ViewportStore.currentEditInstanceKey
    );

    const currentValue: string = this.props.actions.ViewportAction.getInstanceProps(
      this.props.stores.ViewportStore.currentEditInstanceKey,
      this.props.realField
    );

    const data = this.props.editor.data as IEditorSelectData;

    return (
      <Styled.Container>
        <Select style={{ width: 150 }} value={currentValue} onChange={this.handleChange}>
          {data.map((each, index) => {
            return (
              <Select.Option key={index} value={each.value}>
                {each.text}
              </Select.Option>
            );
          })}
        </Select>
      </Styled.Container>
    );
  }

  private handleChange = (value: SelectValue) => {
    this.props.actions.ViewportAction.setInstanceProps(
      this.props.stores.ViewportStore.currentEditInstanceKey,
      this.props.realField,
      value
    );
  };
}

export default {
  position: 'mainToolEditorTypeSelect',
  class: MainToolEditorSelect
};
