import {CSSProperties} from 'react';
import {RuleItem} from 'async-validator';

/**
 * 基础表单参数
 */
export interface FormFieldProps<T> {
  /** 表单项标签 */
  label?: string;
  /** 表单值 */
  value?: any;
  /** 规则配置 */
  rules?: RuleItem | RuleItem[];
  /** 传入组件的 Props 配置，增加 Partial 使部分必填参数非必须 */
  fieldProps?: Partial<T>;
  /** 是否隐藏必填星号 */
  hideRequiredMark?: boolean;
  /** 标签样式 */
  labelStyle?: CSSProperties;
  /**
   * 传入更新事件，更新上层表单
   * @param value
   */
  onChange?: (value: any) => void;
}
