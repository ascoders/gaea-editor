import { Tooltip } from 'antd';
import { Connect } from 'dob-react';
import * as _ from 'lodash';
import * as React from 'react';
import { ChromePicker } from 'react-color';
import * as ReactDOM from 'react-dom';
import * as Styled from './index.style';
import { Props, State } from './index.type';

@Connect
class MainToolEditorColor extends React.Component<Props, State> {
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

    let currentValue: string = this.props.actions.ViewportAction.getInstanceProps(
      this.props.stores.ViewportStore.currentEditInstanceKey,
      this.props.realField
    );

    currentValue = currentValue ? currentValue.toString() : '';

    return (
      <Styled.Container>
        <Tooltip
          trigger="click"
          placement="bottom"
          overlayClassName="main-tool-editor-type-color"
          title={() => <ChromePicker color={currentValue} onChangeComplete={this.handleChangeComplete} />}
        >
          <Styled.ColorContainer>
            <Styled.ColorBox style={{ backgroundColor: currentValue }} />
          </Styled.ColorContainer>
        </Tooltip>
      </Styled.Container>
    );
  }

  private handleChangeComplete = (color: any) => {
    this.props.actions.ViewportAction.setInstanceProps(
      this.props.stores.ViewportStore.currentEditInstanceKey,
      this.props.realField,
      `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
    );
  };
}

export default {
  position: 'mainToolEditorTypeColor',
  class: MainToolEditorColor
};
