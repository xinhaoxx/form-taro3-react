## Taro 3.x 表单组件 - React & Typescript

基于 Taro 3.x 封装的表单组件，目前仅实现 React 版本，支持 async-validator 规则

---

## 特性

- Taro 3.x
- React
- Typescript
- async-validator

---

## 安装

````
npm install form-taro3-react
````

---

## 可用组件

- [x] 表单 - CustomizeForm
- [x] 单行文本框 - FormTextInput
- [x] 多行文本框 - FormTextArea
- [x] 滚动选择器 - FormPicker
- [x] 单选框 - FormRadioGroup
- [x] 联动控件 - FormDependency
- [ ] 其他待实现

---

## 组件使用
### 表单样式
````scss
# index.scss

// 完整引入
@import '~form-taro3-react/dist/styles/index';

// 按需引入
@import '~form-taro3-react/dist/styles/input';
````

### 表单 - CustomizeForm
> `CustomizeForm` 的方法需要通过 `Ref` 调用，所以请在当前组件中创建 ref 对象，具体参考下方示例代码

**通用参数**

| 参数          | 类型                                 | 必填 | 说明                                 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| ref           | React.RefObject<CustomizeFormExpose> |  是  | 表单对象，用于获取表单对象并控制表单 |
| defaultValue  | Record<string, any>                  |  否  | 默认值                               |
| labelStyle    | CSSProperties                        |  否  | 表单项标签样式                       |
| onValueChange | (diff:any) => void                   |  否  | 表单值变更事件                       |
| children      | ReactNode[] &#124; ReactNode         |  是  | 表单内容元素                         |

**可用方法** 

| 方法           | 类型                                 | 说明               |
|----------------|--------------------------------------|--------------------|
| validate       | () => Promise<void>                  | 跟进表单项设置的 async-validator rules 校验表单 |
| reset       | (form?:Record<string, any>) => void | 重置表单，可传入参数值重置 |
| setFieldsValue | (value: Record<string, any>) => void | 设置表单值         |
| getFieldValue  | (name: string) => any                | 获取单个表单项的值 |
| getFieldsValue | () => Record<string, any>            | 获取整个表单的值   |

---
### 表单项通用参数
| 参数             | 类型                   | 必填 | 说明                                                         |
|------------------|------------------------|------|--------------------------------------------------------------|
| label            | string                 | 否   | 表单左侧/顶部标签                                            |
| rules            | RuleItem &#124; RuleItem[] | 否   | async-validator 校验规则，在触发表单 `validate()` 方法时校验 |
| hideRequiredMark | boolean                | 否   | 隐藏必填标识                                                 |
| labelStyle       | CSSProperties          | 否   | 当前表单项的标签样式                                         |

----
### 单行文本 - FormTextInput

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| fieldProps | InputProps | 是 | Taro Input 的通用参数，其中必须声明表单项的 `name`，否则无法获取到表单值 |
| prefix | ReactNode | 否 | 前缀 |
| suffix | ReactNode | 否 | 后缀 |
| align | 'left' &#124; 'right' |  否  | 文本框内容对齐方式，默认值：'left' |
| hideClear | boolean |  否  | 是否隐藏清空按钮 |

----
### 多行文本 - FormTextArea

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| fieldProps | TextareaProps | 是 | Taro Textarea 的通用参数，其中必须声明表单项的 `name`，否则无法获取到表单值 |

----
### 单选框 - FormRadioGroup

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| fieldProps | FormRadioGroupProps | 是 | Taro RadioGroup 的通用参数，其中必须声明表单项的 `name`，否则无法获取到表单值 |

----
### 滚动选择器 - FormPicker

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| fieldProps | FormPickerProps | 是 | Taro FormPickerProps 的通用参数，其中必须声明表单项的 `name`，否则无法获取到表单值 |
| placeholder | string | 否 | 占位符，未选中任何选项时的显示，与 `fieldProps` 同级 |
| separator | string | 否 | 分隔符，在多列选择时使用，与 `fieldProps` 同级 |
| onPickerChange |  (e: any) => void | 否 | 选择变更事件 |

----
### 联动控件 - FormDependency
> 此组件主要参考了 ProFormComponent 的 [ProFormDependency](https://procomponents.ant.design/components/group#proformdependency) ，但当前实现的版本仅支持返回整个 form
> 的值

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| renderer | (form: any) => ReactElement | 是 | 该方法会返回当前 form 表单的值，可以用该值来做表单变化等逻辑 |

---
## 示例代码
````
import React, {Component, createRef} from 'react';
import {View, Text, Button} from '@tarojs/components';
import {
  CustomizeForm,
  CustomizeFormExpose, FormDependency,
  FormPicker,
  FormRadioGroup,
  FormTextArea,
  FormTextInput
} from 'form-taro3-react';

export default class Index extends Component {
  // 表单 Ref
  formRef = createRef<CustomizeFormExpose>();

  /**
   * 表单校验
   */
  validate() {
    this.formRef.current?.validate().then(() => {
      // 获取表单值
      console.log(this.formRef.current?.getFieldsValue());
    });
  }

  render() {
    return (
      <View className='index'>
        <CustomizeForm
          ref={this.formRef}
          defaultValue={{content: 'Taro 3.x React 表单组件封装'}}
          onValueChange={(diff) => {
            console.log(diff);
          }}
        >
          <FormTextInput
            label='标题'
            fieldProps={{
              name: 'title',
              placeholder: '请输入标题'
            }}
            rules={{required: true, message: '标题不能为空'}}
          />
          <FormPicker
            label='选择语言'
            fieldProps={{
              name: 'picker',
              mode: 'selector',
              range: ['Vue', 'React', 'Angular']
            }}
            rules={{required: true, message: '请选择语言'}}
          />
          <FormRadioGroup
            label='性别'
            fieldProps={{
              name: 'selector',
            }}
            options={[
              {label: '男', option: {value: '1'}},
              {label: '女', option: {value: '2'}}
            ]}
            rules={{required: true, message: '请选择'}}
          />
          <FormTextArea
            label='内容'
            fieldProps={{name: 'content'}}
            rules={{required: true, message: '内容不能为空'}}
          />
          <FormDependency
            renderer={(form) => {
              return form?.selector === '1' ? <Text>你选择了：男</Text> : <Text>你选择了：女</Text>;
            }}
          />
          <Button onClick={this.validate.bind(this)}>提交</Button>
        </CustomizeForm>
      </View>
    );
  }
}
````

--- 
## 问题与反馈
如果有问题烦请反馈及PR，thx
