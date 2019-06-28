import { Col as ACol } from 'antd';
import * as React from 'react';

import { Props, State } from './col.type';

export class Col extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <ACol span={this.props.span} style={this.props.style}>
        {this.props.children}{' '}
      </ACol>
    );
  }
}
