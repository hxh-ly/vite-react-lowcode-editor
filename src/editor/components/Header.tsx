import { Button, Space } from "antd";
import { useComponentsStore } from "../stores/components";

export function Header() {
  const { mode, setMode, setCurComponent } = useComponentsStore();
  return (
    <div className="h-[100%] w-[100%]">
      <div className="h-[50px] flex flex-row justify-between items-center px-[20px]">
        <div>低代码编辑器</div>
        <Space>
          {mode === "edit" && (
            <Button
              onClick={() => {
                setMode("preview");
                setCurComponent(null);
              }}
              type="primary"
            >
              预览
            </Button>
          )}
          {mode === "preview" && (
            <Button
              onClick={() => {
                setMode("edit");
              }}
              type="primary"
            >
              退出预览
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
}
