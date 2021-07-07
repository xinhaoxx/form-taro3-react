import {useEffect, useRef} from 'react';
import {RuleItem} from 'async-validator';

/**
 * 判断两个数组是否相同
 * @param a - 数组a
 * @param b - 数组b
 */
export const isArrayEqual = (a: any[], b: any[]) => {
  // 判断数组的长度
  if (a.length !== b.length) {
    return false;
  } else {
    // 循环遍历数组的值进行比较
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
};

/**
 * 保存 Functional Component Hooks 上次渲染状态
 * @param value - 需要保存的值
 */
export const usePrevious = (value) => {
  const ref = useRef({});
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

/**
 * 获取两个JSON对象中不一致的值
 * @param obj1
 * @param obj2
 */
export const Diff = (obj1, obj2) => {
  const result = {};
  if (Object.is(obj1, obj2)) {
    return undefined;
  }
  if (!obj2 || typeof obj2 !== 'object') {
    return obj2;
  }
  Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
    if (obj2?.[key] !== obj1?.[key] && !Object.is(obj1?.[key], obj2?.[key])) {
      result[key] = obj2?.[key];
    }
    if (typeof obj2?.[key] === 'object' && typeof obj1?.[key] === 'object') {
      const value = Diff(obj1?.[key], obj2?.[key]);
      if (value !== undefined) {
        result[key] = value;
      }
    }
  });
  if (!result || Object.keys(result).length === 0) {
    return null;
  }
  return result;
};

/**
 * 判断表单控件是否必填
 * @param rules - 当前表单项校验规则
 */
export const isControlRequired = (rules: RuleItem | RuleItem[] | undefined) => {
  if (!rules) return false;
  if (Array.isArray(rules)) {
    if (rules.length === 0) {
      return false;
    }
    return rules.findIndex((item) => item?.required) > -1;
  } else {
    return !!rules?.required;
  }
};
