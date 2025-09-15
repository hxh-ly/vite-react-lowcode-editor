import { Form, Select } from "antd";
import { useComponentsStore } from "../../stores/components";
import {
  useComponentConfigsStore,
  type ComponentConfigs,
  type ComponentSetter,
} from "../../stores/componentsConfig";
import Input from "antd/es/input/Input";
import { useEffect } from "react";

export function ComponentAttr() {
  const { componentConfig } = useComponentConfigsStore();
  const { curComponent, curComponentId, updateComponentProps } =
    useComponentsStore();
  const [form] = Form.useForm();
  // 如果当前选中的存在就不渲染
  if (!curComponentId || !curComponent) {
    return;
  }
  useEffect(() => {
    const data = form.getFieldsValue();
    const formData = { ...data, ...curComponent.props };
    console.log({ formData });
    form.setFieldsValue(formData); // 表单初始值由这里设置，item的修改在同步到curComponent
    console.log(curComponent)
  }, [curComponent]);
  function renderComponent(item: ComponentSetter) {
    const { type, options } = item;
    if (type === "input") {
      return <Input type="input"></Input>;
    } else if (item.type === "select") {
      return <Select options={options}></Select>;
    }
  }
  function valueChange(changeValues: ComponentConfigs) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }
  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        onValuesChange={valueChange}
      >
        <Form.Item label="组件id" wrapperCol={{span:8}}>
          <Input value={curComponent.id} disabled></Input>
        </Form.Item>
        <Form.Item label="组件name">
          <Input value={curComponent.name} disabled></Input>
        </Form.Item>
        <Form.Item label="组件描述">
          <Input value={curComponent.desc} disabled></Input>
        </Form.Item>
        {componentConfig[curComponent.name].setter?.map((item) => {
          return (
            <Form.Item name={item.name} key={item.name} label={item.label}>
              {renderComponent(item)}
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
}
