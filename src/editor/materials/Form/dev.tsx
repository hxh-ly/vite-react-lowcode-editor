import { useMemo } from "react";
import type { CommonComponentProps } from "../../interface";
import { Form as AntdForm, Input } from "antd";
import React from "react";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { useEditDrag } from "../../hooks/useEditDrag";
const Form = (props: CommonComponentProps) => {
  const { dropRef, canDrop } = useMaterialDrop(["FormItem"], props.id);
  useEditDrag(props, dropRef);
  const [form] = AntdForm.useForm();
  const items = useMemo(() => {
    return React.Children.map(props.children, (item: any) => {
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id,
      };
    });
  }, [props.children]);
  return (
    <div
      ref={dropRef}
      data-component-id={props.id}
      className={`w-[100%] p-[20px] min-h-[100px] ${
        canDrop ? "border-[2px] border-blue" : "border-[1px] border-[#000]"
      }`}
    >
      <AntdForm
        form={form}
        onFinish={(values) => {
          props?.onFinish && props.onFinish(values);
        }}
        wrapperCol={{span:18}}
        labelCol={{span:6}}
      >
        {items.map((v: any) => {
          return (
            <AntdForm.Item
              label={v.label}
              name={v.name}
              key={v?.id}
              data-component-id={v.id}
            >
              <Input type={v.type} style={{ pointerEvents: "none" }}></Input>
            </AntdForm.Item>
          );
        })}
      </AntdForm>
    </div>
  );
};
export default Form;
