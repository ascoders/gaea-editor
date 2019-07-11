import { Form as AForm } from 'antd';
import * as React from 'react';
import { Props, State } from './form.type';

export class Form extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <AForm style={this.props.style}>
        {this.props.children}
      </AForm>
    );
  }
}