import * as React from 'react';
import Component from '../../src/index';

class Props {}

class State {}

export default class Page extends React.PureComponent<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Component />
      </div>
    );
  }
}
