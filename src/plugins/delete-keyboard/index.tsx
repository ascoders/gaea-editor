import { Connect } from 'dob-react';
import * as React from 'react';
import { PureComponent } from '../../utils/react-helper';

// tslint:disable-next-line:no-var-requires
const keymaster = require('keymaster');

@Connect
class Delete extends PureComponent {
  public componentDidMount() {
    keymaster('backspace', this.delete);
  }

  public componentWillUnmount() {
    keymaster.unbind('backspace');
  }

  public render() {
    return null as any;
  }

  private delete = () => {
    if (!this.props.stores.ViewportStore.currentHoverInstanceKey) {
      return;
    }
    this.props.actions.ViewportAction.removeInstance(this.props.stores.ViewportStore.currentHoverInstanceKey);
  };
}

export default {
  position: 'navbarRight',
  class: Delete
};
