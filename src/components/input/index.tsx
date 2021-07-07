import React, {Component, CSSProperties, ReactNode} from 'react';
import {InputProps} from '@tarojs/components/types/Input';
import {Input, View} from '@tarojs/components';
import {FormFieldProps} from '../../interface';
import FormControl from '../control';
import {isControlRequired} from '../../util';

/**
 * 文本框参数
 */
interface FromTextInputProps extends FormFieldProps<InputProps> {
  /** 文本替换事件 */
  replaceEvent?: (value: string) => string;
  /** 前缀 */
  prefix?: ReactNode;
  /** 后缀 */
  suffix?: ReactNode;
  /** 对齐方式，默认值：'left' */
  align?: 'left' | 'right';
  /** 是否隐藏清空按钮 */
  hideClear?: boolean;
}

/**
 * 表单组件：文本输入框
 */
export class FormTextInput extends Component<FromTextInputProps, { value: string; focus: boolean; }> {
  static defaultProps = {
    type: 'FormControl',
    controlName: 'FormTextInput'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      focus: false
    };
  }

  componentWillReceiveProps(nextProps: Readonly<any>) {
    if (this.props.value !== nextProps?.value) {
      this.setState({value: nextProps?.value});
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
    const style: CSSProperties = {
      textAlign: this.props.align ? this.props.align : 'left'
    };

    return (
      <FormControl
        label={this.props.label}
        require={this.isRequired}
        labelStyle={this.props?.labelStyle}
      >
        <View className='form-input-control'>
          {this.props.prefix || null}
          <Input
            style={style}
            value={this.state.value}
            focus={this.state.focus}
            placeholderClass='form-input-control-placeholder'
            onFocus={() => this.setState({focus: true})}
            onBlur={() => {
              setTimeout(() => this.setState({focus: false}), 100);
            }}
            onInput={(e) => {
              let value = e.detail.value;
              if (this.props?.replaceEvent) {
                value = this.props.replaceEvent?.(e.detail.value);
              }
              this.update(value);
            }}
            {...this.props.fieldProps}
          />
          {
            !this.props.hideClear && this.state.focus &&
            <View
              className='input-clear-action'
              onClick={() => {
                if (!this.props.fieldProps?.disabled) {
                  this.update('');
                }
              }}
            >
              <View className='clear-icon' />
            </View>
          }
          {this.props.suffix || null}
        </View>
      </FormControl>
    );
  }
}
