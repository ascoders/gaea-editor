import { Input, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { Connect } from 'dob-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '../../components/icon/src';
import { pipeEvent } from '../../utils/functional';
import * as Styled from './index.style';
import { Props, State } from './index.type';

@Connect
class PageAddPage extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  private pageInfo: IPage = null;

  public render() {
    this.pageInfo = this.props.stores.ApplicationStore.currentEditPage;

    if (!this.pageInfo) {
      return;
    }

    const FolderSelectOptions = this.props.stores.ApplicationStore.pageFolderList
      .filter(pageKey => pageKey !== this.props.stores.ApplicationStore.currentEditPageKey)
      .map(pageKey => {
        const folderInfo = this.props.stores.ApplicationStore.pages.get(pageKey);
        return (
          <Select.Option key={pageKey} value={pageKey}>
            {folderInfo.name || 'Unnamed'}
          </Select.Option>
        );
      });

    return (
      <Styled.Container>
        <Styled.Title>
          <Styled.TitleLeftContainer>
            <span>
              {this.props.stores.ApplicationStore.currentCreatedPageKey
                ? this.props.stores.ApplicationStore.setLocale('添加文件夹', 'Add folder')
                : this.props.stores.ApplicationStore.setLocale('编辑文件夹', 'Edit folder')}
            </span>
            {this.props.stores.ApplicationStore.currentCreatedPageKey !==
              this.props.stores.ApplicationStore.currentEditPageKey &&
              !this.pageInfo.isHomePage &&
              this.props.stores.ApplicationStore.currentViewportPageKey !==
                this.props.stores.ApplicationStore.currentEditPageKey && (
                <Styled.RemoveButtonContainer onClick={this.handleRemove}>
                  <Icon type="trash" size={16} />
                </Styled.RemoveButtonContainer>
              )}
          </Styled.TitleLeftContainer>
          <Styled.CloseContainer onClick={this.handleCloseRightBar}>
            <Icon type="close" size={15} />
          </Styled.CloseContainer>
        </Styled.Title>

        <Styled.FormTitle>{this.props.stores.ApplicationStore.setLocale('名称', 'Name')}</Styled.FormTitle>
        <Input
          disabled={this.pageInfo.isHomePage}
          value={this.pageInfo.name}
          onChange={pipeEvent(this.handleChangeName)}
        />

        <Styled.FormTitle>{this.props.stores.ApplicationStore.setLocale('路径', 'Path')}</Styled.FormTitle>
        <Input
          disabled={this.pageInfo.isHomePage}
          value={this.pageInfo.path}
          onChange={pipeEvent(this.handleChangePath)}
        />

        <Styled.Description>
          {this.props.stores.ApplicationStore.setLocale('路径', 'Path')}:{' '}
          <Styled.RealPath>/{this.props.stores.ApplicationStore.currentEditPageRealPath}</Styled.RealPath>
        </Styled.Description>

        {!this.pageInfo.isHomePage && [
          <Styled.FormTitle key="add-page-parent-title">
            {this.props.stores.ApplicationStore.setLocale('父级文件夹', 'Parent folder')}
          </Styled.FormTitle>,
          <Select key="add-page-parent-select" value={this.pageInfo.parentKey} onChange={this.handleSelectParentFolder}>
            {FolderSelectOptions}
          </Select>
        ]}

        {this.props.stores.ApplicationStore.currentCreatedPageKey && (
          <Styled.Button onClick={this.handleCreate}>
            {this.props.stores.ApplicationStore.setLocale('创建', 'Create')}
          </Styled.Button>
        )}
      </Styled.Container>
    );
  }

  private handleChangeName = (value: string) => {
    this.props.actions.ApplicationAction.changePageName(this.props.stores.ApplicationStore.currentEditPageKey, value);
  };

  private handleChangePath = (value: string) => {
    this.props.actions.ApplicationAction.changePagePath(this.props.stores.ApplicationStore.currentEditPageKey, value);
  };

  private handleCloseRightBar = () => {
    // 如果此时有正在编辑的页面，直接删除
    this.props.actions.ApplicationAction.RemoveCreatingPage();

    this.props.actions.ApplicationAction.setRightTool(null);
  };

  private handleCreate = () => {
    this.props.actions.ApplicationAction.confirmCreatePage();
    this.props.actions.ApplicationAction.setRightTool(null);
  };

  private handleRemove = () => {
    this.props.actions.ApplicationAction.removePage(this.props.stores.ApplicationStore.currentEditPageKey);
    this.props.actions.ApplicationAction.setRightTool(null);
  };

  private handleSelectParentFolder = (pageKey: SelectValue) => {
    this.props.actions.ApplicationAction.changePageParentKey(
      this.props.stores.ApplicationStore.currentEditPageKey,
      pageKey as string
    );
  };
}

export default {
  position: 'toolContainerRightAddPage',
  class: PageAddPage
};
