import {Component, ReactElement} from 'react';

interface FormDependencyProps {
  // 渲染函数
  renderer: (form) => ReactElement
  // 子元素
  children?: ReactElement;
}

// 联动表单组件
export class FormDependency extends Component<FormDependencyProps, {}> {
  static defaultProps = {
    type: 'FormControl',
    controlName: 'FormDependency'
  };

  render() {
    return this.props?.children || null;
  }
}
