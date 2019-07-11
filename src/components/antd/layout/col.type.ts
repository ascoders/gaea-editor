export class Props {
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
  public style: React.CSSProperties = {
    minWidth: 100,
    minHeight: 100
  };
}

export class State {}
