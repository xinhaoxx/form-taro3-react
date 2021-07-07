import React, {CSSProperties, FC, ReactNode} from 'react';
import {Text, View} from '@tarojs/components';

/**
 * 表单项参数
 */
interface FormControlProps {
  /** 表单项标签 */
  label?: string;
  /** 表单标签宽度 */
  labelStyle?: CSSProperties;
  /** 是否必填 */
  require?: boolean;
  /** 表单项控件，传入表单控件组件 */
  children?: ReactNode;
  /** 是否垂直显示 */
  vertical?: boolean;
}

/**
 * 表单项组件
 */
const FormControl: FC<FormControlProps> = (props) => {
  return (
    <View className={`form-control ${props?.vertical ? 'vertical' : ''}`} hoverClass='form-control-hover'>
      {
        props?.label && <View className='label' style={props?.labelStyle}>
          {props?.require && <Text className='require'>*</Text>}
          <Text>{props?.label}</Text>
        </View>
      }
      <View className='control'>
        {props?.children}
      </View>
    </View>
  );
};

export default FormControl;
