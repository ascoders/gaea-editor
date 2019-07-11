export class Props {
  public editSetting = {
    key: 'FormItem',
    name: 'FormItem',
    group: 'data-entry',
    isContainer: true,
    editors: [
      {
        field: 'label',
        text: 'label',
        type: 'string'
      },
      {
        field: 'name',
        text: 'name',
        type: 'string'
      },
      {
        field: 'labelCol',
        text: 'labelCol',
        type: 'number'
      },
      {
        field: 'wrapperCol',
        text: 'wrapperCol',
        type: 'number'
      },
      {
        field: 'inputType',
        text: 'inputType',
        type: 'select',
        data: [
          {
            text: 'input',
            value: 'input'
          },
          {
            text: 'number',
            value: 'number'
          },
          {
            text: 'date',
            value: 'date'
          },
          {
            text: 'datetime',
            value: 'datetime'
          },
          {
            text: 'rangepicker',
            value: 'rangepicker'
          }
        ]
      }
    ]
  };
  public form: any;
  public label: string = 'form-item';
  public name: string = 'form-item';
  public inputType: string = 'input';
  public labelCol: number = 4;
  public wrapperCol: number = 14;
  public rules: any[] = [];
}

export class State {}
