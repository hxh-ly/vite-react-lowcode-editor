import { Input, Select } from "antd";
import type { ComponentEvent } from "../../../stores/componentsConfig";
import { useComponentsStore } from "../../../stores/components";
import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
export interface CustomJsConfig {
  type: "customJs";
  code: string;
}
interface CustomProps {
  value?: CustomJsConfig["code"];
  onChange?: (p: CustomJsConfig) => void;
}
export function CustomJs(props: CustomProps) {
  const { value, onChange } = props;
  const { curComponent, updateComponentProps } = useComponentsStore();
  const [text, setText] = useState(value);
  useEffect(() => {
    setText(text);
  }, [value]);
  const messageTextChange = (value: string | undefined) => {
    setText(value);
    if (!curComponent || !value) {
      return;
    }
    onChange?.({
      type: "customJs",
      code: value,
    });
  };
  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.actin.formatDocument")?.run();
    });
  };
  return (
    <div className="mt-[40px]">
      <div className="flex items-center gap-[10px] mt-[10px]">
        <div>自定义JS：</div>
        <div>
          <MonacoEditor
            width={"600px"}
            height={"400px"}
            path="action.js"
            language="javascript"
            value={text}
            onChange={messageTextChange}
            onMount={handleEditorMount}
            options={{
              minimap: {
                enabled: false,
              },
              scrollBeyondLastLine: false,
              fontSize: 14,
              scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6,
              },
            }}
          ></MonacoEditor>
        </div>
      </div>
    </div>
  );
}
