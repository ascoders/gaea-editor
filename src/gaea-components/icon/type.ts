export class Props {
  public editSetting = {
    key: 'gaea-icon',
    name: 'Icon',
    editors: [
      'Layout',
      {
        text: 'Box editor'
      },
      'Function',
      {
        field: 'type',
        text: 'Type',
        type: 'string'
      },
      'Style',
      {
        field: 'spin',
        text: 'Spin',
        type: 'boolean'
      }
    ]
  };

  public style: React.CSSProperties = {};
  public type: string = 'search';
  public spin = false;
}

export class State {}
