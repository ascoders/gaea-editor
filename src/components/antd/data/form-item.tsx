import { DatePicker, Form as AForm, Input, InputNumber } from 'antd';
import * as React from 'react';
import { Props, State } from './form-item.type';

export class FormItem extends React.Component<Props, State> {
  public static defaultProps = new Props();
  // public state = new State();

  public render() {
    let dom = <Input />;
    switch (this.props.inputType) {
      case 'input':
        break;
      case 'number':
        dom = <InputNumber />;
        break;
      case 'date':
        dom = <DatePicker />;
        break;
      case 'datetime':
        dom = <DatePicker showTime />;
        break;
      case 'rangepicker':
        dom = <DatePicker.RangePicker format="YYYY-MM-DD" />;
        break;
      default:
        break;
    }
    return (
      <AForm.Item
        label={this.props.label}
        labelCol={{ span: this.props.labelCol }}
        wrapperCol={{ span: this.props.wrapperCol }}
      >
        {dom}
      </AForm.Item>
    );
  }
}
