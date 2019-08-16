import { LayoutStyleProps } from './layoutStyle';

export class Props extends LayoutStyleProps {
  public editSetting = {
    key: 'Col',
    name: 'Col',
    isContainer: true,
    group: 'layout',
    editors: [
      'Margin',
      {
        type: 'box-editor'
      },
      'attribute',
      {
        field: 'span',
        text: 'span',
        type: 'number'
      }
    ]
  };
  public span: number = 16;
}

export class State {}
