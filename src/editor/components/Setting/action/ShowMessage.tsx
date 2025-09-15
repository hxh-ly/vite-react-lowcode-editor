import { Input, Select } from "antd";
import type { ComponentEvent } from "../../../stores/componentsConfig";
import { useComponentsStore } from "../../../stores/components";
import { useState } from "react";
export interface ShowMessageConfig {
  type: "showMessage";
  config: {
    type: "success" | "error";
    text: string;
  };
}
interface MessageProps {
  value?: ShowMessageConfig["config"];
  onChange?: (p: ShowMessageConfig) => void;
}
export function ShowMessage(props: MessageProps) {
  const { value, onChange } = props;
  const { curComponent, updateComponentProps } = useComponentsStore();
  const [type, setType] = useState<"success" | "error">(
    value?.type || "success"
  );
  const [text, setText] = useState(value?.text || "");
  const MessageChange = (value: "success" | "error") => {
    if (!curComponent) {
      return;
    }
    setType(value);
    onChange?.({
      type: "showMessage",
      config: {
        type: type,
        text: text,
      },
    });
  };
  const messageTextChange = (value: string) => {
    if (!curComponent) {
      return;
    }
    setText(value);
    onChange?.({
      type: "showMessage",
      config: {
        type: type,
        text: text,
      },
    });
  };
  return (
    <div className="mt-10px">
      <div className="flex items-center gap-[10px]">
        <div>类型：</div>
        <div>
          <Select
            style={{ width: 500, height: 50 }}
            options={[
              { label: "成功", value: "success" },
              { label: "失败", value: "error" },
            ]}
            onChange={(value) => MessageChange(value)}
            value={type}
          ></Select>
        </div>
      </div>

      <div className="flex items-center gap-[10px] mt-[10px]">
        <div>文本：</div>
        <div>
          <Input
            style={{ width: 500, height: 50 }}
            onChange={(e) => {
              messageTextChange(e.target.value);
            }}
            value={text}
          />
        </div>
      </div>
    </div>
  );
}
