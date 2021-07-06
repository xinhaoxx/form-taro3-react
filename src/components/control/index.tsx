import React, {CSSProperties, FC, ReactNode} from 'react';
import {Text, View} from '@tarojs/components';

/**
 * 表单项
 */
interface FormControlProps {
  /**
   * 表单项标签
   */
  label?: string;
  /**
   * 表单标签宽度
   */
  labelStyle?: CSSProperties;
  /**
   * 是否必填
   */
  require?: boolean;
  /**
   * 表单项控件，传入表单控件组件
   */
  children?: ReactNode;
  /**
   * 是否垂直显示
   */
  vertical?: boolean;
}

/**
 * 表单项
 * @description - 用于显示表单标题及表单状态
 * @param label
 * @param require
 * @param children
 * @param labelStyle
 * @param vertical
 */
const FormControl: FC<FormControlProps> = ({label, require, children, labelStyle = {}, vertical = false}) => {
  return (
    <View className={`form-control ${vertical ? 'vertical' : ''}`} hoverClass='form-control-hover'>
      {
        label && <View className='label' style={labelStyle}>
          {require && <Text className='require'>*</Text>}
          <Text>{label}</Text>
        </View>
      }
      <View className='control'>
        {children}
      </View>
    </View>
  );
};

export default FormControl;
