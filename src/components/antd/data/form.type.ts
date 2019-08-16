import { LayoutStyleProps } from '../layout/layoutStyle';

export class Props extends LayoutStyleProps {
  public editSetting = {
    key: 'Form',
    name: 'Form',
    group: 'data-entry',
    isContainer: true,
    editors: [
      {
        field: 'labelAlign',
        text: 'labelAlign',
        type: 'select',
        data: [
          {
            text: 'left',
            value: 'left'
          },
          {
            text: 'right',
            value: 'right'
          }
        ]
      },
      {
        field: 'layout',
        text: 'layout',
        type: 'select',
        data: [
          {
            text: 'horizontal',
            value: 'horizontal'
          },
          {
            text: 'vertical',
            value: 'vertical'
          },
          {
            text: 'inline',
            value: 'inline'
          }
        ]
      }
    ],

    events: [
      {
        text: 'onSubmit',
        field: 'onSubmit'
      }
    ]
  };

  public labelAlign: string = 'left';
  public layout: string = 'inline';
}

export class State {}
