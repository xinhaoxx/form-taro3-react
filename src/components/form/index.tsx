import React, {
  cloneElement,
  createRef,
  CSSProperties,
  forwardRef,
  isValidElement, ReactChild,
  ReactNode, ReactText,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import Schema, {Rules} from 'async-validator';
import {Diff, usePrevious} from '../../util';

/**
 * 自定义表单 参数定义
 */
export interface CustomizeFormProps {
  /** 默认值 */
  defaultValue?: Record<string, any>;
  /** 表单控件 */
  children?: ReactNode[] | ReactNode;
  /** 表单值变更 */
  onValueChange?: (diff) => void;
  /** 标签配置 */
  labelStyle?: CSSProperties;
}

/**
 * 自定义表单 Ref 暴露方法
 */
export interface CustomizeFormExpose {
  /**
   * 校验表单
   * @example
   * this.formRef.current?.validate().then(()=>{
   *   // 校验通过
   * }).catch((err)=>{
   *   // 校验不通过
   * });
   */
  validate: () => Promise<void>;
  /**
   * 重置表单
   * @param form - 新表单值
   */
  reset: (form?: Record<string, any>) => void;
  /**
   * 设置表单值
   * @param value - 值
   * @example
   * this.formRef.current?.setFieldsValue({
   *   name: '张三',
   *   gender: 1,
   * });
   */
  setFieldsValue: (value: Record<string, any>) => void;
  /**
   * 获取单个表单项的值
   * @param name - 表单项名称
   * @return - 该表单项的值
   */
  getFieldValue: (name: string) => any;
  /**
   * 获取表单值
   * @return - 当前表单的值
   */
  getFieldsValue: () => Record<string, any>;
}

/**
 * 自定义表单组件
 */
export const CustomizeForm = forwardRef<CustomizeFormExpose, CustomizeFormProps>((props, ref) => {
  const [form, setForm] = useState<Record<string, any>>(props?.defaultValue || {});
  const prevForm = usePrevious(form);

  // 检查 prevForm 与 最新 form 之前的差异，并通过 onChange 告知调用组件
  useEffect(() => {
    const diff = Diff(prevForm, form);
    if (diff) props?.onValueChange?.(diff);
  }, [form]);

  /**
   * 扩展表单控件 Props
   * @param control - 表单控件
   */
  const cloneProps = (control: ReactChild): ReactChild | ReactText => {
    if (isValidElement(control)) {
      // 扩展 Props
      const extendProps: any = {
        form,
        ref: createRef(),
        // 变更事件
        onChange: (val) => {
          setForm({
            ...form,
            [control?.props?.fieldProps?.name]: val
          });
        }
      };
      // 通过表单项名称，赋值
      const name = control.props?.fieldProps?.name || control.props.name;
      if (name) {
        extendProps.value = form.hasOwnProperty(name) ? form[name] : null;
      }
      if (props?.labelStyle) {
        extendProps.labelStyle = {
          ...props.labelStyle,
          ...(control.props?.labelStyle || {})
        };
      }
      return cloneElement(control, extendProps);
    } else {
      console.log('not valid element ', control);
      // 必须加时间戳，否则深层级组件不刷新
      return control;
    }
  };

  // async-validator 校验规则集合
  const descriptor: Rules = {};

  /**
   * 克隆子集元素
   * @param children - 子集
   */
  const clone = (children: any) => {
    const operation = (item: ReactChild) => {
      if (isValidElement(item)) {
        // 获取控件名称
        const isFormControl = item?.props?.type === 'FormControl';
        const controlName = item?.props.controlName;
        // 渲染联动表单控件
        if (isFormControl && controlName === 'FormDependency') {
          item = cloneElement(item, {
            children: item.props?.renderer(form)
          });
        }
        // 递归获取子集
        if (item?.props && item.props.children) {
          item.props.children = clone(item.props.children);
        }
        if (isFormControl) {
          // 扩展表单控件属性
          item = cloneProps(item);
          // 记录校验规则
          if (typeof item !== 'number' && typeof item !== 'string' && item?.props?.rules) {
            descriptor[item?.props?.fieldProps?.name] = item.props?.rules;
          }
        } else {
          // 必须加时间戳，否则深层级组件不刷新
          item = cloneElement(item, {timestamp: new Date().getTime()});
        }
      }
      return item;
    };
    if (children && Array.isArray(children)) {
      return children?.map(item => {
        return operation(item);
      });
    } else {
      return operation(children);
    }
  };

  // 执行克隆
  const cloneChildren = clone(props.children);

  // 创建校验器
  const validator = new Schema(descriptor);

  // 暴露表单方法
  useImperativeHandle(ref, (): CustomizeFormExpose => ({
    validate: () => {
      return new Promise<void>((resolve, reject) => {
        validator.validate(form).then(() => {
          resolve();
        }).catch(({errors}) => {
          Taro.showToast({
            title: errors[0]?.message,
            icon: 'none'
          });
          reject();
        });
      });
    },
    reset: (form: any) => {
      setForm({
        ...form || {}
      });
    },
    getFieldValue: (name: string) => {
      return form[name];
    },
    getFieldsValue: () => form,
    setFieldsValue: (value) => {
      setForm({
        ...form,
        ...value
      });
    }
  }), [form]);

  return <View className='customize-form'>{cloneChildren}</View>;
});
