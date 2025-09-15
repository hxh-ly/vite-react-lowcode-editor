import { Form, InputNumber, Select } from "antd";
import { useComponentsStore } from "../../stores/components";
import {
  useComponentConfigsStore,
  type ComponentConfigs,
  type ComponentSetter,
} from "../../stores/componentsConfig";
import Input from "antd/es/input/Input";
import { useEffect, useState, type CSSProperties } from "react";
import StyleToObject from "style-to-object";
import { CssEditor } from "./CssEditor";

export function ComponentStyle() {
  const { componentConfig } = useComponentConfigsStore();
  const [css, setCss] = useState(`.comp{\n\n}`);
  const {
    curComponent,
    curComponentId,
    updateComponentProps,
    updateComponentStyle,
  } = useComponentsStore();
  const [form] = Form.useForm();
  // 如果当前选中的存在就不渲染
  if (!curComponentId || !curComponent) {
    return;
  }
  useEffect(() => {
    form.resetFields();
    const data = form.getFieldsValue();
    const formData = { ...data, ...curComponent.styles };
    console.log({ formData });
    form.setFieldsValue(formData); // 表单初始值由这里设置，item的修改在同步到curComponent
    setCss(toCssStr(curComponent.styles))
}, [curComponent]);
  function toCssStr(css?: Record<string, any>) {
    let str = ".comp {\n";
    for (let key in css) {
      let value = css[key];
      if (!value) {
        continue;
      }
      if (["width,height"].includes(key) && !value.toString().endsWith("px")) {
        value += "px";
      }
      str += `\t${key}:${value};\n`;
    }
    str += "}";
    return str;
  }
  function renderComponent(item: ComponentSetter) {
    const { type, options } = item;
    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    } else if (type === "inputNumber") {
      return <InputNumber />;
    }
  }
  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyle(curComponentId, { ...changeValues });
    }
  }
  const handleCssChange = (value: string | undefined) => {
    setCss(value!);
    let css: Record<string, any> = {};
    try {
      let s = value
        ?.replace(/\/\*.*\*\//, "")
        .replace(/\.?[^{]+{/, "")
        .replace("}", "");
      StyleToObject(s!, (name, value) => {
        const key = name.replace(/-\w/, (item) =>
          item.toLocaleUpperCase().replace("-", "")
        );
        css[key] = value.replace(/"|'/g, "");
      });
      // console.log({ css });
      updateComponentStyle(
        curComponentId,
        { ...form.getFieldsValue(), ...css },
        true
      );
    } catch (error) {}
  };
  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        onValuesChange={valueChange}
      >
        {componentConfig[curComponent.name].stylesSetter?.map((item) => {
          return (
            <Form.Item name={item.name} key={item.name} label={item.label}>
              {renderComponent(item)}
            </Form.Item>
          );
        })}
      </Form>
      <div className="border-[1px] border-[#ccc] h-[200px]">
        <CssEditor value={css} onChange={handleCssChange}></CssEditor>
      </div>
    </div>
  );
}
