import {
  PickerDateProps,
  PickerMultiSelectorProps,
  PickerRegionProps, PickerSelectorProps,
  PickerTimeProps
} from '@tarojs/components/types/Picker';
import React, {Component} from 'react';
import {Picker, Text, View} from '@tarojs/components';
import {FormFieldProps} from '../../interface';
import {isArrayEqual, isControlRequired} from '../../util';
import FormControl from '../control';

/**
 * 滚动选择器参数定义
 */
export interface FormPickerProps extends FormFieldProps<PickerMultiSelectorProps | PickerTimeProps | PickerDateProps | PickerRegionProps | PickerSelectorProps> {
  /** 占位符 */
  placeholder?: string;
  /** 多列选择器的分隔符 */
  separator?: string
  /** Picker 变化事件 */
  onPickerChange?: (e) => void;
}

/**
 * 滚动选择器组件
 */
export class FormPicker extends Component<FormPickerProps, { value: number | number[] | string | string[] }> {
  static defaultProps = {
    type: 'FormControl',
    controlName: 'FormPicker'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props?.value || null
    };
  }

  componentWillReceiveProps(nextProps: Readonly<any>) {
    if (
      (this.props.value !== nextProps?.value) ||
      (Array.isArray(nextProps.value) && !isArrayEqual(this.props.value, nextProps.value))
    ) {
      this.setState({value: nextProps?.value});
    }
  }

  // 是否必填
  readonly isRequired = !this.props.hideRequiredMark && isControlRequired(this.props?.rules);

  /**
   * 更新表单值
   * @param value
   */
  update(value) {
    this.setState({value});
    this.props?.onPickerChange?.(value);
    this.props?.onChange?.(value);
  };

  render() {
    let label: string | null;
    const rangeKey = (this.props.fieldProps as PickerSelectorProps)?.rangeKey;
    const isValueNullOrUndefined = this.state.value === undefined || this.state.value === null;
    switch (this.props.fieldProps?.mode) {
      case 'selector':
        const curr = !isValueNullOrUndefined ? (this.props.fieldProps as PickerSelectorProps)?.range?.[this.state.value as number] : null;
        label = rangeKey ? curr?.[rangeKey] : curr;
        break;
      case 'multiSelector':
        label = !isValueNullOrUndefined && Array.isArray(this.state.value) ? (this.state.value as number[]).map((item, i) => {
          const curr = (this.props.fieldProps as PickerMultiSelectorProps)?.range?.[i]?.[item];
          return rangeKey ? curr?.[rangeKey] : curr;
        }).join(this.props?.separator || '') : null;
        break;
      default:
        label = this.state.value as string;
        break;
    }
    return (
      <FormControl
        label={this.props.label}
        require={this.isRequired}
        labelStyle={this.props?.labelStyle}
      >
        <View className='form-picker-control'>
          {/* @ts-ignore */}
          <Picker
            className='picker'
            value={this.state.value}
            onChange={(e) => this.update(e.detail.value)}
            {...this.props.fieldProps}
          >
            <View className='inner-picker'>
              <Text className={`label ${!label ? 'empty' : ''}`}>
                {label || this.props?.placeholder || (this.props.fieldProps?.disabled ? '无' : '请选择')}
              </Text>
              {this.props.fieldProps?.disabled ? null : <View className='picker-dropdown'><View className='dropdown-icon' /></View>}
            </View>
          </Picker>
        </View>
      </FormControl>
    );
  }
}
