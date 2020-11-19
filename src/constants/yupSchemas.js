import * as yup from 'yup';

export const accountSchema = (requiredMessage) =>
  yup
    .string()
    .matches(/.[a-z*A-Z*0-9*]+$/, '僅能輸入英文與數字組合')
    .max(16, '長度不可超過16個字元')
    .required(requiredMessage);

export const passwordSchema = yup
  .string()
  .matches(
    /^(?=.{8,20}$)([a-zA-Z]+\d+|\d+[a-zA-Z]+)\w*$/,
    '請設置8至20碼英數組合'
  )
  .required('密码不可为空');

export const nameSchema = (requiredMessage) =>
  yup.string('不是正确的文字格式').required(requiredMessage);

export const dateSchema = (requiredMessage) =>
  yup.date().typeError('錯誤的時間格式').required(requiredMessage);

export const enumSchema = (types, typeMessage, requiredMessage) =>
  yup.number().typeError(requiredMessage).oneOf(types, typeMessage).required(requiredMessage);

export const urlSchema = (typeMessage, requiredMessage) =>
  yup.string().url().typeError(typeMessage).required(requiredMessage);
