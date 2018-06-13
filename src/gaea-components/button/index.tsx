import { Button as AntButton } from 'antd';
import * as React from 'react';
import { Props, State } from './type';

export class Button extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <AntButton
        style={this.props.style}
        ghost={this.props.ghost}
        href={this.props.href}
        icon={this.props.icon}
        loading={this.props.loading}
        shape={this.props.shape as any}
        size={this.props.size as any}
        target={this.props.target}
        type={this.props.type}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </AntButton>
    );
  }
}
