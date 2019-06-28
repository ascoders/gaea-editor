export class Props {
  public editSetting = {
    key: 'Row',
    name: 'Row',
    isContainer: true,
    group: 'layout',
    editors: [
      {
        field: 'gutter',
        text: 'gutter',
        type: 'number'
      }
    ]
  };
  public gutter: number = 16;
  public style: React.CSSProperties = {
    minWidth: 100,
    minHeight: 100
  };
}

export class State {}
