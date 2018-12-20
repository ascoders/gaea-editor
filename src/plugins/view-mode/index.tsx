import { Icon } from 'antd';
import { Connect } from 'dob-react';
import * as React from 'react';
import { Props, State } from './index.type';
import * as S from './style';

const selections: Array<{
  title: string;
  icon: string;
  width: number | string;
  height: number | string;
}> = [
  {
    title: 'PC',
    icon: 'laptop',
    width: '100%',
    height: '100%'
  },
  {
    title: 'Iphone6/7/8',
    icon: 'mobile',
    width: 414,
    height: 736
  },
  {
    title: 'IphoneX',
    icon: 'mobile',
    width: 375,
    height: 812
  },
  {
    title: 'iPad',
    icon: 'tablet',
    width: 768,
    height: 1024
  }
];

@Connect
class ViewMode extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public componentWillMount() {
    this.changeCurrentIndex(0);
  }

  public render() {
    return (
      <S.Container onMouseEnter={this.showModel} onMouseLeave={this.hideModel}>
        <Icon type={selections[this.state.currentIndex].icon} />

        {this.renderModel()}
      </S.Container>
    );
  }

  private showModel = () => {
    this.setState({ showModel: true });
  };

  private hideModel = () => {
    this.setState({ showModel: false });
  };

  private renderModel = () => {
    if (!this.state.showModel) {
      return null;
    }

    return (
      <S.ModelContainer>
        {selections.map((each, index) => {
          return this.renderViewMode(each.icon, each.title, index);
        })}
      </S.ModelContainer>
    );
  };

  private renderViewMode = (icon: string, text: string, index: number) => {
    return (
      <S.ViewModeItem
        className={this.state.currentIndex === index ? 'active' : ''}
        key={index}
        onClick={this.changeCurrentIndex.bind(this, index)}
      >
        <Icon type={icon} />
        <S.ViewModeText>{text}</S.ViewModeText>
      </S.ViewModeItem>
    );
  };

  private changeCurrentIndex = (index: number) => {
    this.setState(
      {
        currentIndex: index
      },
      () => {
        this.props.actions.ApplicationAction.setViewportStyle({
          width: selections[this.state.currentIndex].width,
          height: selections[this.state.currentIndex].height
        });
      }
    );
  };
}

export default {
  position: 'navbarRight',
  class: ViewMode
};
