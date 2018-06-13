import { Button as AntButton } from 'antd';
import * as React from 'react';
import { Props, State } from './type';

export class Container extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return <div style={this.props.style}>{this.props.children}</div>;
  }
}
