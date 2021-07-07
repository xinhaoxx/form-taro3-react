import {Component, ReactElement} from 'react';

/**
 * 联动表单参数
 */
interface FormDependencyProps {
  /** 请勿传入 children */
  children?: ReactElement;
  /**
   * 渲染函数
   * @param form - 当前表单值
   */
  renderer: (form) => ReactElement
}

/**
 * 联动表单组件
 */
export class FormDependency extends Component<FormDependencyProps, {}> {
  static defaultProps = {
    type: 'FormControl',
    controlName: 'FormDependency'
  };

  render() {
    return this.props?.children || null;
  }
}
