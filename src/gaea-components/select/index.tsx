import { Select as AntSelect } from 'antd';
import { SelectValue } from 'antd/lib/select';
import * as React from 'react';
import { Props, State } from './type';

export class Select extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <AntSelect
        style={this.props.style}
        value={this.state.selectedValue}
        onSelect={this.handleSelect}
        size={this.props.size}
        disabled={this.props.disabled}
        autoFocus={this.props.autoFocus}
      >
        {this.props.options.map((each, index) => {
          return (
            <AntSelect.Option key={index} value={each.value} disabled={each.disabled}>
              {each.text}
            </AntSelect.Option>
          );
        })}
      </AntSelect>
    );
  }

  private handleSelect = (value: SelectValue) => {
    this.setState({
      selectedValue: value
    });
    this.props.onSelect(value as string);
  };
}
