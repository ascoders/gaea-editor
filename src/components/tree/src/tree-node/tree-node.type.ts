export class Props {
  /**
   * 标题
   */
  public title?: string = '';

  /**
   * 是否展示子元素
   */
  public showChildren?: boolean = false;

  /**
   * 是否默认展开全部
   */
  public defaultExpendAll?: boolean = false;

  /**
   * 标题渲染
   */
  public render?: () => void;

  /**
   * 点击展开/隐藏后的回调
   */
  public onToggleShow?: (title?: any) => void;

  /**
   * 整体被点击回调
   */
  public onClick?: (event?: Event) => void;

  /**
   * 被划过
   */
  public onMouseOver?: (event?: Event) => void;

  /**
   * 是否通过点击小箭头展开/隐藏
   */
  public toggleByArrow?: boolean = false;
}

export class State {
  /**
   * 是否显示children
   */
  public showChildren?: boolean = false;
}
