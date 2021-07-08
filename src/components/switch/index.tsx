import React, {Component} from 'react';
import {Switch, View} from '@tarojs/components';
import {SwitchProps} from '@tarojs/components/types/Switch';
import {FormFieldProps} from '../../interface';
import FormControl from '../control';
import {isControlRequired} from '../../util';

/**
 * 开关组件
 */
export class FormSwitch extends Component<FormFieldProps<SwitchProps>, { value: boolean }> {
  static defaultProps = {
    type: 'FormControl',
    controlName: 'FormSwitch'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || false
    };
  }

  componentWillReceiveProps(nextProps: Readonly<any>) {
    if (this.props.value !== nextProps?.value) {
      this.setState({value: nextProps?.value || false});
    }
  }

  // 是否必填
  readonly isRequired = !this.props.hideRequiredMark && isControlRequired(this.props?.rules);

  /**
   * 更新表单值
   * @param value
   */
  update(value: boolean) {
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
        <View className='form-switch-control'>
          <Switch
            checked={this.state.value}
            onChange={(e) => this.update(e.detail.value)}
            {...this.props.fieldProps}
          />
        </View>
      </FormControl>
    );
  }
}
