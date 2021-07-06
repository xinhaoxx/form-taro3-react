import React, {Component} from 'react';
import {TextareaProps} from '@tarojs/components/types/Textarea';
import {Textarea, View} from '@tarojs/components';
import {FormFieldProps} from '../../interface';
import FormControl from '../control';
import {isControlRequired} from '../../util';

// 表单组件：多行文本输入框
export class FormTextArea extends Component<FormFieldProps<TextareaProps>, { value: string }> {
  static defaultProps = {
    type: 'FormControl',
    controlName: 'FormTextArea'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  componentWillReceiveProps(nextProps: Readonly<any>) {
    if (this.props.value !== nextProps?.value) {
      this.setState({value: nextProps?.value || ''});
    }
  }

  // 是否必填
  readonly isRequired = !this.props.hideRequiredMark && isControlRequired(this.props?.rules);

  /**
   * 更新表单值
   * @param value
   */
  update(value: string) {
    this.setState({value});
    this.props?.onChange?.(value);
  };

  render() {
    return (
      <FormControl
        label={this.props.label}
        require={this.isRequired}
        labelStyle={this.props?.labelStyle}
      >
        <View className='form-textarea-control'>
          <Textarea
            value={this.state.value}
            onInput={(e) => this.update(e.detail.value)}
            showConfirmBar={false}
            cursorSpacing={120}
            placeholderClass='form-textarea-control-placeholder'
            {...this.props.fieldProps}
          />
        </View>
      </FormControl>
    );
  }
}
