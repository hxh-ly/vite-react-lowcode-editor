import { Input } from "antd";
import type { ComponentEvent } from "../../../stores/componentsConfig";
import { useComponentsStore } from "../../../stores/components";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
export interface GotoLinkConfig {
  type: "goToLink";
  url: string;
}
interface GoToLinkProps {
  defaultValue?: string;
  onChange: (p: GotoLinkConfig) => void;
}
export function GoToLink(props: GoToLinkProps) {
  const { onChange, defaultValue } = props;
  const { curComponent } = useComponentsStore();
  const urlChange = (value: string) => {
    if (!curComponent) {
      return;
    }
    setValue(value);
    onChange({ type: "goToLink", url: value });
  };
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="mt-[40px]">
      <div className="flex items-center gap-[10px]">
        <div>链接</div>
        <div>
          <TextArea
            style={{ width: 500, height: 200, border: "1px solid #000" }}
            onChange={(e) => urlChange(e.target.value)}
            value={value || ""}
          ></TextArea>
        </div>
      </div>
    </div>
  );
}
