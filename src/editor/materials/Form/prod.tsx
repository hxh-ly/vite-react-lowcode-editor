import { forwardRef, useImperativeHandle, useMemo } from "react";
import type { CommonComponentProps } from "../../interface";
import {
  Form as AntdForm,
  DatePicker,
  Input,
  message,
  type FormInstance,
  type FormProps,
} from "antd";
import React from "react";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { useEditDrag } from "../../hooks/useEditDrag";
interface FormRef {
  submit: () => void;
}
const Form = forwardRef<FormRef, CommonComponentProps>((props, ref) => {
  const [form] = AntdForm.useForm();
  const items = useMemo(() => {
    return React.Children.map(props.children, (item: any) => {
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id,
        rules: item.props?.rules,
      };
    });
  }, [props.children]);
  useImperativeHandle(ref, () => {
    return {
      submit: () => {
        form.submit();
      },
    };
  });
  return (
    <>
      <AntdForm
        form={form}
        onFinish={(values) => {
          props?.onFinish && props.onFinish(values);
        }}
        wrapperCol={{ span: 18 }}
        labelCol={{ span: 6 }}
      >
        {items.map((v: any) => {
          return (
            <AntdForm.Item
              label={v.label}
              name={v.name}
              key={v.id}
              rules={
                v.rules === "required"
                  ? [{ required: true, message: "不能为空" }]
                  : []
              }
            >
              {v.type === "input" && <Input></Input>}
              {v.type === "date" && <DatePicker></DatePicker>}
            </AntdForm.Item>
          );
        })}
      </AntdForm>
    </>
  );
});
export default Form;
