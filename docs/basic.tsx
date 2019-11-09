import GaeaComponents from 'gaea-basic-components';
import * as React from 'react';
import Component from '../src/index';

class Props {}

class State {}

class TestComponent extends React.PureComponent {
  public static defaultProps = {
    editSetting: {
      key: 'aaaa',
      name: '66666',
      isContainer: false,
    },
  };

  public render() {
    return <div>123</div>;
  }
}

export default class Page extends React.PureComponent<Props, State> {
  public static defaultProps = new Props();

  public state = new State();

  public render() {
    return (
      <Component
        componentClasses={[TestComponent, ...GaeaComponents]}
        onSave={data => {
          console.log('data', JSON.stringify(data));
        }}
        layout={{
          showDragMenu: true,
          defaultViewMode: 'Iphone6/7/8',
        }}
      />
    );
  }
}
