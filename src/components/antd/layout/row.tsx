import { Row as ARow } from 'antd';
import * as React from 'react';

import { Props, State } from './row.type';

export class Row extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <ARow gutter={this.props.gutter} style={this.props.style}>
        {this.props.children}
      </ARow>
    );
  }
}
