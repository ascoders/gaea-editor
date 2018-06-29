import * as React from 'react';
import Component from '../src/index';

class Props {}

class State {}

export default class Page extends React.PureComponent<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <Component
        onSave={data => {
          // tslint:disable-next-line:no-console
          console.log(JSON.stringify(data, null, 2));
        }}
        defaultValue={{
          gaea_instance_1: {
            gaeaKey: 'gaea-container',
            data: {
              props: {
                style: {
                  display: 'block',
                  flexGrow: 1
                }
              }
            },
            childs: ['gaea_instance_2', 'gaea_instance_3'],
            parentInstanceKey: null
          },
          gaea_instance_2: {
            gaeaKey: 'gaea-button',
            data: {},
            childs: [],
            parentInstanceKey: 'gaea_instance_1'
          },
          gaea_instance_3: {
            gaeaKey: 'gaea-button',
            data: {},
            childs: [],
            parentInstanceKey: 'gaea_instance_1'
          }
        }}
        locale="en"
      />
    );
  }
}
