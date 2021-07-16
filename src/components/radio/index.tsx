import {RadioGroupProps} from '@tarojs/components/types/RadioGroup';
import {RadioProps} from '@tarojs/components/types/Radio';
import React, {Component} from 'react';
import {Label, Radio, RadioGroup, View, Text} from '@tarojs/components';
import {FormFieldProps} from '../../interface';
import FormControl from '../control';
import {isControlRequired} from '../../util';

/**
 * 单选框参数
 */
export interface FormRadioGroupProps extends FormFieldProps<RadioGroupProps> {
  /** 选中值 */
  value?: number | string;
  /** 选项列表 */
  options: { label: string; option: RadioProps }[];
  /** 排列方式：'vertical'-垂直排列、'horizontal'-水平排列，默认：水平 */
  layout?: 'vertical' | 'horizontal';
}

/**
 * 单选框组件
 */
export class FormRadioGroup extends Component<FormRadioGroupProps, { value: any }> {
  static defaultProps = {
    type: 'FormControl',
    controlName: 'FormRadioGroup'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props?.value || null
    };
  }

  componentWillReceiveProps(nextProps: Readonly<any>) {
    if (this.props.value !== nextProps?.value) {
      this.setState({value: nextProps?.value});
    }
  }

  // 是否必选
  readonly isRequired = !this.props.hideRequiredMark && isControlRequired(this.props?.rules);

  /**
   * 更新表单值
   * @param value
   */
  update(value) {
    this.setState({value});
    this.props?.onChange?.(value);
  }

  render() {
    return (
      <FormControl
        label={this.props.label}
        require={this.isRequired}
        labelStyle={this.props?.labelStyle}
      >
        <RadioGroup
          className='form-radio-group'
          onChange={(e) => this.update(e.detail.value)}
          {...this.props.fieldProps}
        >
          <View className={`form-radio-group-control ${this.props?.layout || 'horizontal'}`}>
            {
              this.props.options && this.props.options.map((item, index) => {
                const key = index + '';
                return (
                  <Label for={key} key={key}>
                    <Radio
                      {...item.option}
                      key={item.option.value}
                      checked={item.option?.value === this.state?.value}
                    >
                      <Text>{item.label}</Text>
                    </Radio>
                  </Label>
                );
              })
            }
          </View>
        </RadioGroup>
      </FormControl>
    );
  }
}
