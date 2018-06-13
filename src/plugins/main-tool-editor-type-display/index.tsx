import { Button, Input, InputNumber, Switch, Tooltip } from 'antd';
import { Connect } from 'dob-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BoxEditor } from '../../components/box-editor/src/';
import Icon from '../../components/icon/src';
import { pipeEvent } from '../../utils/functional';
import * as S from './index.style';
import { Props, State } from './index.type';

const ButtonGroup = Button.Group;

const ActiveButton = (props: any) => {
  const { active, ...others } = props;
  return (
    <Button {...others} size="small" type={active ? 'primary' : null}>
      {props.children}
    </Button>
  );
};

@Connect
class MainToolDisplay extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo;

  public render() {
    if (!this.props.stores.ViewportStore.instances.has(this.props.stores.ViewportStore.currentEditInstanceKey)) {
      return null;
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(
      this.props.stores.ViewportStore.currentEditInstanceKey
    );

    const display =
      this.props.actions.ViewportAction.getInstanceProps(
        this.props.stores.ViewportStore.currentEditInstanceKey,
        'style.display'
      ) || 'block';

    return (
      <S.Container>
        {this.renderDisplay()}
        {display === 'flex' && this.renderFlex()}
      </S.Container>
    );
  }

  private handleUpdateValue = (field: string, value: any) => {
    this.props.actions.ViewportAction.setInstanceProps(
      this.props.stores.ViewportStore.currentEditInstanceKey,
      field,
      value
    );
  };

  /**
   * 暂时不开放此功能
   */
  private handleChangeReverse = (checked: boolean) => {
    // const flexDirection = this.props.actions.ViewportAction.getInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, "style.flexDirection")
    // switch (flexDirection) {
    //   case "row":
    //     this.handleUpdateValue("style.flexDirection", "row-reverse")
    //     break
    //   case "row-reverse":
    //     this.handleUpdateValue("style.flexDirection", "row")
    //     break
    //   case "column":
    //     this.handleUpdateValue("style.flexDirection", "column-reverse")
    //     break
    //   case "column-reverse":
    //     this.handleUpdateValue("style.flexDirection", "column")
    //     break
    // }
  };

  private handleChangeDirection = (isVertical: boolean) => {
    if (isVertical) {
      this.handleUpdateValue('style.flexDirection', 'column');
    } else {
      this.handleUpdateValue('style.flexDirection', 'row');
    }
  };

  private handleFlexGrowChange = (value: string) => {
    const intValue = value === '' ? null : parseInt(value, 10);
    this.handleUpdateValue('style.flexGrow', intValue);
  };

  /**
   * flex 选项
   */
  private renderFlex = () => {
    const flexDirection =
      this.props.actions.ViewportAction.getInstanceProps(
        this.props.stores.ViewportStore.currentEditInstanceKey,
        'style.flexDirection'
      ) || 'row';
    const flexGrow =
      this.props.actions.ViewportAction.getInstanceProps(
        this.props.stores.ViewportStore.currentEditInstanceKey,
        'style.flexGrow'
      ) || 0;
    const alignItems =
      this.props.actions.ViewportAction.getInstanceProps(
        this.props.stores.ViewportStore.currentEditInstanceKey,
        'style.alignItems'
      ) || 'stretch';
    const justifyContent =
      this.props.actions.ViewportAction.getInstanceProps(
        this.props.stores.ViewportStore.currentEditInstanceKey,
        'style.justifyContent'
      ) || 'flex-start';

    // 判断是否逆序
    let isReverse = false;
    switch (flexDirection) {
      case 'row':
        isReverse = false;
        break;
      case 'row-reverse':
        isReverse = true;
        break;
      case 'column':
        isReverse = false;
        break;
      case 'column-reverse':
        isReverse = true;
        break;
    }

    const isRow = flexDirection === 'row' || flexDirection === 'row-reverse';

    const rowStart = !isReverse ? 'left' : 'right';
    const columnStart = !isReverse ? 'top' : 'bottom';
    const rowEnd = !isReverse ? 'right' : 'left';
    const columnEnd = !isReverse ? 'bottom' : 'top';
    const firstLineDirection = isRow ? 'horizontal' : 'vertical';
    const secondLineDirection = isRow ? 'vertical' : 'horizontal';

    const rowFlexStart = `${firstLineDirection} ${isRow ? rowStart : columnStart}`;
    const rowFlexCenter = `${firstLineDirection} center`;
    const rowFlexEnd = `${firstLineDirection} ${isRow ? rowEnd : columnEnd}`;
    const rowFlexSpaceBetween = `${firstLineDirection} space between`;
    const rowFlexSpaceAround = `${firstLineDirection} space around`;

    const columnFlexStart = `${secondLineDirection} ${isRow ? 'top' : 'left'}`;
    const columnFlexCenter = `${secondLineDirection} center`;
    const columnFlexEnd = `${secondLineDirection} ${isRow ? 'bottom' : 'right'}`;
    const columnFlexStrech = `${secondLineDirection} strech`;
    const columnFlexBaseline = `${secondLineDirection} baseline`;

    return (
      <S.FlexContainer>
        <S.FlexRow style={{ marginTop: 5 }}>
          <ButtonGroup>
            <Tooltip mouseLeaveDelay={0} title={rowFlexStart}>
              <ActiveButton
                active={justifyContent === 'flex-start'}
                onClick={this.handleUpdateValue.bind(this, 'style.justifyContent', 'flex-start')}
              >
                <Icon className={isRow ? 'rotate-180' : 'rotate-270'} type="flexDirectionEnd" />
              </ActiveButton>
            </Tooltip>
            <Tooltip mouseLeaveDelay={0} title={rowFlexCenter}>
              <ActiveButton
                active={justifyContent === 'center'}
                onClick={this.handleUpdateValue.bind(this, 'style.justifyContent', 'center')}
              >
                <Icon className={isRow ? null : 'rotate-90'} type="flexDirectionCenter" />
              </ActiveButton>
            </Tooltip>
            <Tooltip mouseLeaveDelay={0} title={rowFlexEnd}>
              <ActiveButton
                active={justifyContent === 'flex-end'}
                onClick={this.handleUpdateValue.bind(this, 'style.justifyContent', 'flex-end')}
              >
                <Icon className={isRow ? null : 'rotate-90'} type="flexDirectionEnd" />
              </ActiveButton>
            </Tooltip>
            <Tooltip mouseLeaveDelay={0} title={rowFlexSpaceBetween}>
              <ActiveButton
                active={justifyContent === 'space-between'}
                onClick={this.handleUpdateValue.bind(this, 'style.justifyContent', 'space-between')}
              >
                <Icon className={isRow ? null : 'rotate-90'} type="flexSpaceBetween" />
              </ActiveButton>
            </Tooltip>
            <Tooltip mouseLeaveDelay={0} title={rowFlexSpaceAround}>
              <ActiveButton
                active={justifyContent === 'space-around'}
                onClick={this.handleUpdateValue.bind(this, 'style.justifyContent', 'space-around')}
              >
                <Icon className={isRow ? null : 'rotate-90'} type="flexSpaceAround" />
              </ActiveButton>
            </Tooltip>
          </ButtonGroup>
        </S.FlexRow>

        <S.FlexRow style={{ marginTop: 5 }}>
          <ButtonGroup>
            <Tooltip mouseLeaveDelay={0} title={columnFlexStart}>
              <ActiveButton
                active={alignItems === 'flex-start'}
                onClick={this.handleUpdateValue.bind(this, 'style.alignItems', 'flex-start')}
              >
                <Icon className={isRow ? null : 'rotate-270'} type="flexAlignStart" />
              </ActiveButton>
            </Tooltip>
            <Tooltip mouseLeaveDelay={0} title={columnFlexCenter}>
              <ActiveButton
                active={alignItems === 'center'}
                onClick={this.handleUpdateValue.bind(this, 'style.alignItems', 'center')}
              >
                <Icon className={isRow ? null : 'rotate-270'} type="flexAlignCenter" />
              </ActiveButton>
            </Tooltip>
            <Tooltip mouseLeaveDelay={0} title={columnFlexEnd}>
              <ActiveButton
                active={alignItems === 'flex-end'}
                onClick={this.handleUpdateValue.bind(this, 'style.alignItems', 'flex-end')}
              >
                <Icon className={isRow ? 'rotate-180' : 'rotate-90'} type="flexAlignStart" />
              </ActiveButton>
            </Tooltip>
            <Tooltip mouseLeaveDelay={0} title={columnFlexStrech}>
              <ActiveButton
                active={alignItems === 'stretch'}
                onClick={this.handleUpdateValue.bind(this, 'style.alignItems', 'stretch')}
              >
                <Icon className={isRow ? null : 'rotate-270'} type="flexAlignStretch" />
              </ActiveButton>
            </Tooltip>
            <Tooltip mouseLeaveDelay={0} title={columnFlexBaseline}>
              <ActiveButton
                active={alignItems === 'baseline'}
                onClick={this.handleUpdateValue.bind(this, 'style.alignItems', 'baseline')}
              >
                <Icon className={isRow ? null : 'rotate-90'} type="flexBaseline" />
              </ActiveButton>
            </Tooltip>
          </ButtonGroup>
        </S.FlexRow>

        <S.FlexRow style={{ marginTop: 5 }}>
          <Switch
            checked={flexDirection === 'column' || flexDirection === 'column-reverse'}
            onChange={this.handleChangeDirection}
            checkedChildren="vertical"
            unCheckedChildren="horizontal"
          />
          <div className="second-container-flex-grow-container">
            <Input
              style={{ width: 130 }}
              size="small"
              addonBefore="Grow"
              type="number"
              onChange={pipeEvent(this.handleFlexGrowChange)}
              value={flexGrow}
            />
          </div>
        </S.FlexRow>
      </S.FlexContainer>
    );
  };

  private renderDisplay = () => {
    const display =
      this.props.actions.ViewportAction.getInstanceProps(
        this.props.stores.ViewportStore.currentEditInstanceKey,
        'style.display'
      ) || 'block';

    return (
      <S.DisplayContainer>
        <ButtonGroup>
          <Tooltip mouseLeaveDelay={0} title="Block">
            <ActiveButton
              active={display === 'block'}
              onClick={this.handleUpdateValue.bind(this, 'style.display', 'block')}
            >
              <Icon type="displayBlock" />
            </ActiveButton>
          </Tooltip>
          <Tooltip mouseLeaveDelay={0} title="InlineBlock">
            <ActiveButton
              active={display === 'inline-block'}
              onClick={this.handleUpdateValue.bind(this, 'style.display', 'inline-block')}
            >
              <Icon type="displayInlineBlock" />
            </ActiveButton>
          </Tooltip>
          <Tooltip mouseLeaveDelay={0} title="Inline">
            <ActiveButton
              active={display === 'inline'}
              onClick={this.handleUpdateValue.bind(this, 'style.display', 'inline')}
            >
              <Icon type="displayInline" />
            </ActiveButton>
          </Tooltip>
        </ButtonGroup>

        <Tooltip mouseLeaveDelay={0} title="Flex">
          <ActiveButton
            active={display === 'flex'}
            onClick={this.handleUpdateValue.bind(this, 'style.display', 'flex')}
          >
            <Icon type="displayFlex" />
          </ActiveButton>
        </Tooltip>

        <Tooltip mouseLeaveDelay={0} title="None">
          <ActiveButton
            active={display === 'none'}
            onClick={this.handleUpdateValue.bind(this, 'style.display', 'none')}
          >
            <Icon size={16} type="eyeSlash" />
          </ActiveButton>
        </Tooltip>
      </S.DisplayContainer>
    );
  };
}

export default {
  position: 'mainToolEditorTypeDisplay',
  class: MainToolDisplay
};
