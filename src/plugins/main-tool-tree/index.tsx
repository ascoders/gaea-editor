import { Connect } from 'dob-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tree } from '../../components/tree/src';
import TreeAction from './action';
import Guideline from './guideline/guideline.component';
import * as Styled from './index.style';
import { Props, State } from './index.type';
import TreeStore from './store';
import CustomTreeNode from './tree-node/tree-node.component';

@Connect
class MainToolTree extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  private treeContainer: React.ReactInstance;

  public componentDidMount() {
    const treeContainerDom = ReactDOM.findDOMNode(this.treeContainer) as HTMLElement;
    this.props.actions.TreeAction.setTreeRootDom(treeContainerDom);
  }

  public handleMouseLeave = () => {
    this.props.actions.ViewportAction.setCurrentHoverInstanceKey(null);
  };

  public render() {
    const rootInstanceKey = this.props.stores.ViewportStore.rootInstanceKey;

    return (
      <Styled.Container>
        <Styled.TreeContainer onMouseLeave={this.handleMouseLeave} ref={(ref: any) => (this.treeContainer = ref)}>
          <Tree defaultExpendAll={true} toggleByArrow={true}>
            <CustomTreeNode key={rootInstanceKey} instanceKey={rootInstanceKey} />
          </Tree>
          <Guideline />
        </Styled.TreeContainer>

        <Styled.AbsoluteContainer>
          {this.props.stores.ApplicationStore.setLocale('实例数量', 'Instance count')}:{' '}
          {this.props.stores.ViewportStore.instances.size}
        </Styled.AbsoluteContainer>
      </Styled.Container>
    );
  }
}

export default {
  position: 'mainToolTree',
  class: MainToolTree,
  actions: {
    TreeAction
  },
  stores: {
    TreeStore
  }
};
