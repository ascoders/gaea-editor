export class Props {
  public editSetting = {
    key: 'gaea-select',
    name: 'Select',
    isContainer: true,
    editors: [
      'Layout',
      {
        type: 'box-editor'
      },
      'Function',
      {
        field: 'options',
        text: 'Options',
        type: 'array',
        data: [
          {
            field: 'value',
            type: 'string',
            text: 'Value'
          },
          {
            field: 'text',
            type: 'string',
            text: 'Text'
          },
          {
            field: 'disabled',
            type: 'boolean',
            text: 'Disabled'
          }
        ]
      },
      {
        field: 'disabled',
        text: 'Disabled',
        type: 'boolean'
      },
      {
        field: 'autoFocus',
        text: 'AutoFocus',
        type: 'boolean'
      },
      'Style',
      {
        field: 'size',
        text: 'Size',
        type: 'select',
        data: [
          {
            value: 'default',
            text: 'Default'
          },
          {
            value: 'small',
            text: 'Small'
          },
          {
            value: 'large',
            text: 'Large'
          }
        ]
      }
    ],
    events: [
      {
        text: 'onSelect',
        field: 'onSelect',
        data: [
          {
            text: 'Selected Value'
          }
        ]
      }
    ]
  };

  public size: 'small' | 'large' | 'default' = 'default';
  public disabled = false;
  public autoFocus = false;
  public style: React.CSSProperties = {};
  public options: IOption[] = [
    {
      value: null,
      text: 'Banana',
      disabled: false
    }
  ];
  public onSelect = (value?: string) => {
    //
  };
}

export class State {
  public selectedValue: any = null;
}

export interface IOption {
  value: string;
  text: string;
  disabled: boolean;
}
