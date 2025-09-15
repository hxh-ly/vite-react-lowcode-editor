import MonacoEditor from "@monaco-editor/react";
import type { OnMount, EditorProps } from "@monaco-editor/react";
import { debounce } from "lodash-es";

interface Props {
  value: string;
  onChange?: EditorProps["onChange"];
  options?: any;
}
export function CssEditor(props: Props) {
  const { value, onChange, options } = props;
  const handleMount: OnMount = (editor, monaco) => {
    console.log('mount')
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };
  return (
    <MonacoEditor
      value={value}
      language="css"
      height={'100%'}
      path="component.css"
      onChange={debounce(onChange!,500)}
      onMount={handleMount}
      options={{
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        minimap: {
          enabled: false,
        },
        fontSize: 14,
        ...options,
      }}
    ></MonacoEditor>
  );
}
