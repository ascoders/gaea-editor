import { Icon as AntIcon } from 'antd';
import * as React from 'react';
import { Props, State } from './type';

export class Icon extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return <AntIcon style={this.props.style} type={this.props.type} spin={this.props.spin} />;
  }
}
