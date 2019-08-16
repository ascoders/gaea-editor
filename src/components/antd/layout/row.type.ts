import { LayoutStyleProps } from './layoutStyle';

export class Props extends LayoutStyleProps {
  public editSetting = {
    key: 'Row',
    name: 'Row',
    isContainer: true,
    group: 'layout',
    editors: [
      'Margin',
      {
        type: 'box-editor'
      },
      'attribute',
      {
        field: 'gutter',
        text: 'gutter',
        type: 'number'
      }
    ]
  };
  public gutter: number = 16;
}

export class State {}
