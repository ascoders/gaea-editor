import { Connect } from 'dob-react';
import * as keymaster from 'keymaster';
import * as React from 'react';
import { PureComponent } from '../../utils/react-helper';

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
