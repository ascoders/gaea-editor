import { Connect } from 'dob-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '../../components/icon/src';
import { Tree } from '../../components/tree/src';
import PageAction from './action';
import * as Styled from './index.style';
import { Props, State } from './index.type';
import PageStore from './store';
import TreeNode from './tree-node/tree-node.component';

@Connect
class Page extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public componentWillMount() {
    this.props.actions.ApplicationAction.RemoveCreatingPage();
  }

  public render() {
    const Pages = this.props.stores.ApplicationStore.rootPageKeys.map(pageKey => {
      return <TreeNode key={pageKey} pageKey={pageKey} />;
    });

    return (
      <Styled.Container>
        <Styled.Title>
          <Styled.TitleLeftContainer>
            <div>{this.props.stores.ApplicationStore.setLocale('页面配置', 'Page configuration')}</div>
            <Styled.CloseContainer onClick={this.handleCloseLeftBar}>
              <Icon type="close" size={15} />
            </Styled.CloseContainer>
          </Styled.TitleLeftContainer>
          <Styled.TitleRightContainer>
            <Styled.AddIcon onClick={this.handleAddFolder}>
              <Icon type="addFolder" />
            </Styled.AddIcon>
            <Styled.AddIcon onClick={this.handleAddPage}>
              <Icon type="addFile" size={17} />
            </Styled.AddIcon>
          </Styled.TitleRightContainer>
        </Styled.Title>

        {this.props.stores.ApplicationStore.pages.size > 0 && <Tree>{Pages}</Tree>}

        {this.props.stores.ApplicationStore.pages.size === 1 && (
          <Styled.EmptyContainer>
            <Styled.EmptyTitle>
              {this.props.stores.ApplicationStore.setLocale('添加新页面', 'Add new Page')}
            </Styled.EmptyTitle>
            <Styled.EmptyDescription>
              {this.props.stores.ApplicationStore.setLocale(
                '点击右上角的按钮，创建一个文件夹或页面',
                'Click the top right button, create a folder or page.'
              )}
            </Styled.EmptyDescription>
          </Styled.EmptyContainer>
        )}
      </Styled.Container>
    );
  }

  private handleCloseLeftBar = () => {
    this.props.actions.ApplicationAction.RemoveCreatingPage();
    this.props.actions.ApplicationAction.setLeftTool(null);
    this.props.actions.ApplicationAction.setRightTool(null);
  };

  private handleAddFolder = () => {
    this.props.actions.ApplicationAction.RemoveCreatingPage();
    this.props.actions.ApplicationAction.createNewPage(true);
    this.props.actions.ApplicationAction.setRightTool('addFolder');
  };

  private handleAddPage = () => {
    this.props.actions.ApplicationAction.RemoveCreatingPage();
    this.props.actions.ApplicationAction.createNewPage(false);
    this.props.actions.ApplicationAction.setRightTool('addPage');
  };
}

export default {
  position: 'toolContainerLeftPage',
  class: Page,
  actions: {
    PageAction
  },
  stores: {
    PageStore
  }
};
