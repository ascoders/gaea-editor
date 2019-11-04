import { Connect } from 'dob-react';
import * as React from 'react';
import { PureComponent } from '../../utils/react-helper';
import { CopyPasteAction } from './action';
import { Props, State } from './index.type';
import { CopyPasteStore } from './store';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const keymaster = require('keymaster');

@Connect
class CopyPaste extends PureComponent<Props, State> {
  public componentDidMount() {
    keymaster('⌘+c, ctrl+c', this.copy);
    keymaster('⌘+v, ctrl+v', this.paste);
  }

  public componentWillUnmount() {
    keymaster.unbind('⌘+c, ctrl+c');
    keymaster.unbind('⌘+v, ctrl+v');
  }

  public render() {
    return null as any;
  }

  private copy = () => {
    this.props.actions.CopyPasteAction.copyCurrentHoverInstance();
  };

  private paste = () => {
    this.props.actions.CopyPasteAction.pasteToCurrentHoverInstance();
  };
}

export default {
  position: 'navbarRight',
  class: CopyPaste,
  actions: {
    CopyPasteAction,
  },
  stores: {
    CopyPasteStore,
  },
};
