## Taro 3.x 表单组件 - React & Typescript

基于 Taro 3.x 封装的基础表单组件，目前仅实现 React 版本，支持 async-validator 规则

---

## 特性

- 支持 Taro 3.x React
- 表单控件支持传入 [async-validator](https://github.com/yiminghe/async-validator) 校验规则
- 支持表单联动

---

## 安装

````
npm install form-taro3-react
````

---

## 可用组件

- [x] [表单](#CustomizeForm) - `CustomizeForm`
- [x] [单行文本框](#FormTextInput) - `FormTextInput`
- [x] [多行文本框](#FormTextArea) - `FormTextArea`
- [x] [滚动选择器](#FormPicker) - `FormPicker`
- [x] [单选框](#FormRadioGroup) - `FormRadioGroup`
- [x] [多选框](#FormCheckboxGroup) - `FormCheckboxGroup`
- [x] [开关](#FormSwitch) - `FormSwitch`
- [x] [联动控件](#FormDependency) - `FormDependency`
- [ ] 其他待实现

---

## 如何使用

### 引入表单样式

````scss
/** src/app.scss */

// 完整引入
@import '~form-taro3-react/dist/styles/index';

// 按需引入
@import '~form-taro3-react/dist/styles/input';
````

### CustomizeForm
表单组件 

> `CustomizeForm` 的方法需要通过 `Ref` 调用，所以请在当前组件中创建 `Ref` 对象，具体参考下方[示例代码](示例代码)

```` typescript
import React, {Component, createRef} from 'react';
import { CustomizeFormExpose } from 'form-taro3-react';

export default class Index extends Component {
  // 表单 Ref
  formRef = createRef<CustomizeFormExpose>();
  
  render() {
  ...  
}
````

**通用参数**

| 参数          | 类型                                 | 必填 | 说明                                 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| `ref`           | `React.RefObject<CustomizeFormExpose>` |  是  | 表单对象，用于获取表单对象并控制表单 |
| `defaultValue`  | `Record<string, any>`                  |  否  | 默认值                              |
| `labelStyle`    | `CSSProperties`                        |  否  | 表单项标签样式                       |
| `onValueChange` | `(diff:any) => void`                   |  否  | 表单值变更事件                       |
| `children`      | `ReactNode[]` `ReactNode`         |  是  | 表单内容元素                         |

**可用方法**

| 方法           | 类型                                 | 说明               |
|----------------|--------------------------------------|--------------------|
| `validate`       | `() => Promise<void>`                  | 校验整个表单，根据设置的 [async-validator](https://github.com/yiminghe/async-validator) `rules`  |
| `validateField`       | `(name: string) => Promise<void>`  | 校验单个表单项，根据表单项设置的 [async-validator](https://github.com/yiminghe/async-validator) `rules`  |
| `reset`       | `(form?:Record<string, any>) => void` | 重置整个表单，可传入参数值重置 |
| `setFieldsValue` | `(value: Record<string, any>) => void` | 设置整个表单的值         |
| `getFieldValue`  | `(name: string) => any`                | 获取单个表单项的值 |
| `getFieldsValue` | `() => Record<string, any>`            | 获取整个表单的值   | 

**表单项通用参数**

| 参数             | 类型                   | 必填 | 说明                                                         |
|------------------|------------------------|------|--------------------------------------------------------------|
| `label`            | `string`                 | 否   | 表单左侧/顶部标签                                            |
| `rules`            | `RuleItem` `RuleItem[]` | 否   | 传入 [async-validator](https://github.com/yiminghe/async-validator) 校验规则，在触发 `validate()` 或 `validateField()` 时校验 |
| `hideRequiredMark` | `boolean`                | 否   | 隐藏<span style='color: red'>*</span>必填标识，默认会判断 `rules` 中的 `required` 生成                                                |
| `labelStyle`       | `CSSProperties`          | 否   | 当前表单项的标签样式，优先级最大                                         |

----

### FormTextInput
单行文本

**通用参数**

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| `fieldProps` | `InputProps` | 是 | Taro Input 的通用参数，其中必须声明表单项的 `name`，否则无法获取到表单值 |
| `prefix` | `ReactNode` | 否 | 前缀 |
| `suffix` | `ReactNode` | 否 | 后缀 |
| `align` | `'left'` `'right'` |  否  | 文本框内容对齐方式：`'left'`-左对齐、`'right'`-右对齐，默认值：`'left'` |
| `hideClear` | `boolean` |  否  | 是否隐藏清空按钮 |

----

### FormTextArea
多行文本框

**通用参数**

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| `fieldProps` | `TextareaProps` | 是 | Taro Textarea 的通用参数，其中必须声明表单项的 `name`，否则无法获取到表单值 |

----

### FormRadioGroup
单选框

**通用参数**

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| `fieldProps` | `FormRadioGroupProps` | 是 | Taro RadioGroup 的通用参数，其中必须声明表单项的 `name`，否则无法获取到表单值 |
| `layout` | `'vertical'` `'horizontal'`  | 否 | 排列方式，`'vertical'`-垂直排列、`'horizontal'`-水平排列（默认） |

----

### FormCheckboxGroup
多选框

**通用参数**

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| `fieldProps` | `FormCheckboxGroupProps` | 是 | Taro CheckboxGroup 的通用参数，其中必须声明表单项的 `name`，否则无法获取到表单值 |
| `layout` | `'vertical'` `'horizontal'`  | 否 | 排列方式，`'vertical'`-垂直排列、`'horizontal'`-水平排列（默认） |

----

### FormSwitch
开关

**通用参数**

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| `fieldProps` | `FormSwitchProps` | 是 | Taro Switch 的通用参数，其中必须声明表单项的 `name`，否则无法获取到表单值 |

----

### FormPicker
滚动选择器

**通用参数**

| 参数 | 类型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| `fieldProps` | `FormPickerProps` | 是 | Taro FormPickerProps 的通用参数，其中必须声明表单项的 `name`，否则无法获取到表单值 |
| `placeholder` | `string` | 否 | 占位符，未选中任何选项时的显示，与 `fieldProps` 同级 |
| `separator` | `string` | 否 | 分隔符，在多列选择时使用，与 `fieldProps` 同级 |
| `onPickerChange` |  `(e: any) => void` | 否 | 选择变更事件 |

----

### FormDependency
联动控件

> 此组件主要参考了 ProFormComponent 的 [ProFormDependency](https://procomponents.ant.design/components/group#proformdependency) ，但当前实现的版本仅支持返回整个 form 的值

**通用参数**

| 参数 | 类通用参型 | 必填 | 说明 |
|---------------|--------------------------------------|:----:|--------------------------------------|
| `renderer` | `(form: any) => ReactElement` | 是 | 该方法会返回当前 form 表单的值，可以用该值来做表单变化等逻辑 |

---

## 示例代码

```` typescript
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
      // 校验通过
      // 获取表单值
      console.log(this.formRef.current?.getFieldsValue());
    }).catch((error)=>{
      // 校验不通过
    });
  }
  
  /**
   * 校验单个表单
   */
  validate() {
    this.formRef.current?.validateField('title').then(() => {
      // 校验通过
      // 获取表单值
      console.log(this.formRef.current?.getFieldValue('title'));
    }).catch((error)=>{
      // 校验不通过
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
          <FormSwitch
            label='开关'
            fieldProps={{name: 'switch'}}
            rules={{required: true, message: '请选择开关'}}
          />
          <FormCheckboxGroup
            label='多选框'
            fieldProps={{
              name: 'checkbox'
            }}
            options={[
              {label: 'Apex', value: '1'},
              {label: 'PUBG', value: '2'},
              {label: 'CSOL', value: '3'},
            ]}
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
