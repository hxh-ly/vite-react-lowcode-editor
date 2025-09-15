import { Input, Select, Tree, TreeSelect } from "antd";
import {
  useComponentConfigsStore,
  type ComponentEvent,
} from "../../../stores/componentsConfig";
import {
  getComponentById,
  useComponentsStore,
  type Component,
} from "../../../stores/components";
import { useEffect, useState } from "react";
export interface ComponentMethodConfig {
  type: "componentMethod";
  config: {
    id: number;
    method: string;
  };
}
interface ComponentMethodProps {
  value?: ComponentMethodConfig["config"];
  onChange?: (p: ComponentMethodConfig) => void;
}
export function ComponentMethod(props: ComponentMethodProps) {
  const { value, onChange } = props;
  const { components, curComponent, updateComponentProps } =
    useComponentsStore();
  if (!curComponent) {
    return;
  }
  const { componentConfig } = useComponentConfigsStore();
  const [selectComponent, setSelectComponent] = useState<Component>();
  const [curId, setCurId] = useState<number>();
  const [text, setText] = useState(value?.method || "");
  useEffect(() => {
    if (!value) {
      return;
    }
    setCurId(value?.id);
    setText(value?.method);
    setSelectComponent(getComponentById(value?.id, components)!);
  }, [value]);
  const options = selectComponent
    ? componentConfig[selectComponent.name]?.methods?.map((item) => {
        return {
          label: item.label,
          value: item.name,
        };
      })
    : [];
  const messageTextChange = (value: string) => {
    if (!selectComponent) {
      return;
    }
    setText(value);
    onChange?.({
      type: "componentMethod",
      config: {
        id: selectComponent.id,
        method: value,
      },
    });
  };
  const handleSelect = (id: number) => {
    let comp = getComponentById(id, components);
    if (!comp) {
      return;
    }
    setSelectComponent(comp);
  };
  return (
    <div className="mt-40px">
      <div className="flex items-center gap-[10px] mt-[10px]">
        <div>组件：</div>
        <div>
          <TreeSelect
            fieldNames={{ label: "desc", value: "id" }}
            style={{ width: 500, height: 50 }}
            treeData={components as any}
            onChange={handleSelect}
            value={curId}
          />
        </div>
      </div>
      {componentConfig[selectComponent?.name || ""] && (
        <div className="flex items-center gap-[10px] mt-[20px]">
          <div>方法：</div>
          <div>
            <Select
              style={{ width: 500, height: 50 }}
              options={options}
              onChange={(value) => messageTextChange(value)}
              value={text}
            ></Select>
          </div>
        </div>
      )}
    </div>
  );
}
