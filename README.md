## Taro 3.x 表单组件 - React & Typescript
基于 Taro 3.x 封装的表单组件，目前仅实现 React 版本

---
### 特性
- Taro 3.x
- React
- Typescript

---
### 安装
````
npm install form-taro3-react
````

---
### 可用组件
- [x] 表单 - CustomizeForm
- [x] 单行文本框 - FormTextInput
- [x] 多行文本框 - FormTextArea
- [x] 滚动选择器 - FormPicker
- [x] 单选框 - FormRadioGroup
- [x] 联动控件 - FormDependency
- [ ] 其他待实现

---
### 组件使用
待完善

---
### 示例代码
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
