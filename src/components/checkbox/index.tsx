import React, {Component} from 'react';
import {Checkbox, CheckboxGroup, Label, View, Text} from '@tarojs/components';
import {CheckboxGroupProps} from '@tarojs/components/types/CheckboxGroup';
import {CheckboxProps} from '@tarojs/components/types/Checkbox';
import {FormFieldProps} from '../../interface';
import FormControl from '../control';
import {isControlRequired} from '../../util';


/**
 * 单选框参数
 */
export interface FormCheckboxGroupProps extends FormFieldProps<CheckboxGroupProps> {
  /** 选中值 */
  value?: (number | string)[];
  /** 选项列表 */
  options: (CheckboxProps & { label: string })[]
}

/**
 * 多选框组件
 */
export class FormCheckboxGroup extends Component<FormCheckboxGroupProps, { value: (number | string)[] }> {
  static defaultProps = {
    type: 'FormControl',
    controlName: 'FormCheckboxGroup'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || []
    };
  }

  componentWillReceiveProps(nextProps: Readonly<any>) {
    if (this.props.value !== nextProps?.value) {
      this.setState({value: nextProps?.value || []});
    }
  }

  // 是否必选
  readonly isRequired = !this.props.hideRequiredMark && isControlRequired(this.props?.rules);

  /**
   * 更新表单值
   * @param value
   */
  update(value: (number | string)[]) {
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
        <View className='form-checkbox-group'>
          <CheckboxGroup
            {...this.props.fieldProps}
            onChange={(e) => this.update(e.detail.value)}
          >
            <View className='form-checkbox-group-control'>
              {
                this.props.options?.map((item, index) => {
                  const key = index + '';
                  const checked = this.state.value?.length ? this.state.value?.findIndex(value => item.value === value) > -1 : false;
                  return (
                    <Label for={key} key={key}>
                      <Checkbox value={item.value} checked={checked}><Text>{item.label}</Text></Checkbox>
                    </Label>
                  );
                })
              }
            </View>
          </CheckboxGroup>
        </View>
      </FormControl>
    );
  }
}
