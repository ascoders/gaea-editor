import { Tree } from 'antd';
import { Connect } from 'dob-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '../../components/icon/src';
import * as Styled from './index.style';
import { Props, State } from './index.type';

/**
 * 添加组件的分类,目前有一下分类
 *
 * general            -> 通用
 * layout             -> 布局
 * navigation         -> 导航
 * data-entry         -> 数据录入
 * data-display       -> 数据展示
 * feedback           -> 反馈
 * other              -> 其他
 * undefined-grouping -> 未定义
 *
 * 在editSetting里面设置group字段的文本信息,如果没有设置group属性,或者group属性为空,则分配到未定义组件
 */
@Connect
class DragMenu extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  private listContainer: HTMLElement[] = [];
  private groups: any[] = [];

  public componentWillMount() {
    this.groups.push({
      name: 'general',
      label: this.props.stores.ApplicationStore.setLocale('通用', 'General')
    });
    this.groups.push({
      name: 'layout',
      label: this.props.stores.ApplicationStore.setLocale('布局', 'Layout')
    });

    this.groups.push({
      name: 'navigation',
      label: this.props.stores.ApplicationStore.setLocale('导航', 'Navigation')
    });
    this.groups.push({
      name: 'data-entry',
      label: this.props.stores.ApplicationStore.setLocale('数据录入', 'Data Entry')
    });
    this.groups.push({
      name: 'data-display',
      label: this.props.stores.ApplicationStore.setLocale('数据展示', 'Data Display')
    });
    this.groups.push({
      name: 'feedback',
      label: this.props.stores.ApplicationStore.setLocale('反馈', 'Feedback')
    });
    this.groups.push({
      name: 'other',
      label: this.props.stores.ApplicationStore.setLocale('其他', 'Other')
    });
    this.groups.push({
      name: 'undefined-grouping',
      label: this.props.stores.ApplicationStore.setLocale('未定义', 'Undefined grouping')
    });
  }

  public componentDidMount() {
    this.listContainer.forEach(element => {
      this.props.actions.ViewportAction.registerOuterDrag(element);
    });
  }

  public render() {
    const expandedKeys = this.groups
      .filter((element: any) => {
        // 如果没有组件则不需要显示分组信息
        if (this.getComponentTreeNode(element.name).length === 0) {
          return false;
        }
        return true;
      })
      .map(element => {
        return element.name;
      });

    return (
      <Styled.Container>
        <Styled.Title>
          <div>{this.props.stores.ApplicationStore.setLocale('拖拽组件', 'Drag Component')}</div>
          <Styled.CloseContainer onClick={this.handleCloseLeftBar}>
            <Icon type="close" size={15} />
          </Styled.CloseContainer>
        </Styled.Title>

        <Styled.SearchInput
          value={this.state.searchContent}
          onChange={this.handleSearch}
          placeholder={this.props.stores.ApplicationStore.setLocale('搜索..', 'Search..')}
        />

        <Styled.ListContainer>
          <Tree defaultExpandAll={true} expandedKeys={expandedKeys}>
            {this.getComponentTree()}
          </Tree>
        </Styled.ListContainer>

        {this.props.actions.ApplicationAction.loadPluginByPosition('toolContainerDragMenuList')}
      </Styled.Container>
    );
  }

  private getComponentTree() {
    return this.groups
      .filter((element: any) => {
        // 如果没有组件则不需要显示分组信息
        if (this.getComponentTreeNode(element.name).length === 0) {
          return false;
        }

        return true;
      })
      .map(element => {
        return (
          <Tree.TreeNode
            key={element.name}
            title={element.label}
            ref={(ref: React.ReactInstance) => {
              const htmlDom: any = ReactDOM.findDOMNode(ref) || null;
              if (htmlDom != null && htmlDom.children != null && htmlDom.children.length === 3) {
                this.listContainer.push(htmlDom.children[2]);
              }
            }}
          >
            {this.getComponentTreeNode(element.name)}
          </Tree.TreeNode>
        );
      });
  }

  private getComponentTreeNode(grouName: string) {
    return Array.from(this.props.stores.ApplicationStore.componentClasses)
      .filter(([gaeaKey, componentClass]) => {
        const setting = this.props.stores.ApplicationStore.componentSetting.get(gaeaKey);

        // 如果被设置为了预设组件，过滤掉
        if (
          Array.from(this.props.stores.ApplicationStore.preComponents.keys()).some(
            preGaeaKey => preGaeaKey === setting.key
          )
        ) {
          return false;
        }

        // 过滤当前的分组文件信息
        const currentGroupName: string = setting.group || 'undefined-grouping';

        // Container 为基础组件
        if (setting.name === 'Container' && grouName === 'layout') {
          return false;
        }

        if (setting.name === 'Container' && grouName === 'undefined-grouping') {
          return false;
        }
        // end

        if (currentGroupName !== grouName) {
          return false;
        }

        // 如果搜索框没有输入，展示
        if (this.state.searchContent === '') {
          return true;
        }
        return new RegExp(this.state.searchContent).test(setting.name);
      })
      .map(([gaeaKey, componentClass], index) => {
        const setting = this.props.stores.ApplicationStore.componentSetting.get(gaeaKey);
        return (
          <Tree.TreeNode
            key={`${grouName}_standard_${index}`}
            data-gaea-key={setting.key}
            title={<div>{setting.name}</div>}
          />
        );
      });
  }

  private handleCloseLeftBar = () => {
    this.props.actions.ApplicationAction.setLeftTool(null);
    this.props.actions.ApplicationAction.setRightTool(null);
  };

  private handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      searchContent: event.currentTarget.value as string
    });
  };
}

export default {
  position: 'toolContainerLeftDragMenu',
  class: DragMenu
};
