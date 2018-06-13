import { Switch as AntSwitch } from 'antd';
import * as React from 'react';
import { Props, State } from './type';

export class Switch extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <AntSwitch
        checked={this.props.checked}
        checkedChildren={this.props.checkedChildren}
        unCheckedChildren={this.props.unCheckedChildren}
        loading={this.props.loading}
        size={this.props.size}
        onChange={this.props.onChange}
      />
    );
  }
}
