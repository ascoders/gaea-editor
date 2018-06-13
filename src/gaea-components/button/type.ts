export class Props {
  public editSetting = {
    key: 'gaea-button',
    name: 'Button',
    editors: [
      'Layout',
      {
        type: 'box-editor'
      },
      'Function',
      {
        field: 'text',
        text: 'Text',
        type: 'string'
      },
      {
        field: 'href',
        text: 'Href',
        type: 'string'
      },
      {
        field: 'target',
        text: 'Target',
        type: 'string'
      },
      'Style',
      {
        field: 'type',
        text: 'Type',
        type: 'select',
        data: [
          {
            value: null,
            text: 'Default'
          },
          {
            value: 'primary',
            text: 'Primary'
          },
          {
            value: 'dashed',
            text: 'Dashed'
          },
          {
            value: 'danger',
            text: 'Danger'
          }
        ]
      },
      {
        field: 'ghost',
        text: 'Transparent',
        type: 'boolean'
      },
      {
        field: 'icon',
        text: 'Icon',
        type: 'string'
      },
      {
        field: 'loading',
        text: 'Loading',
        type: 'boolean'
      },
      {
        field: 'shape',
        text: 'Shape',
        type: 'select',
        data: [
          {
            value: null,
            text: 'Default'
          },
          {
            value: 'circle',
            text: 'Circle'
          }
        ]
      },
      {
        field: 'size',
        text: 'Size',
        type: 'select',
        data: [
          {
            value: null,
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
        text: 'OnClick',
        field: 'onClick'
      }
    ]
  };

  public style: React.CSSProperties = {};
  public text: string = 'Button Text';
  public type: ButtonType = null;
  public ghost = false;
  public href: any = null;
  public icon = '';
  public loading = false;
  public shape: string = null;
  public size: string = null;
  public target: any = null;
  public onClick = () => {
    //
  };
}

export class State {}

type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
