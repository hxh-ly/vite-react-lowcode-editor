import { Modal, Segmented } from "antd";
import type { ComponentEvent } from "../../stores/componentsConfig";
import { GoToLink, type GotoLinkConfig } from "./action/GoToLink";
import { ShowMessage, type ShowMessageConfig } from "./action/ShowMessage";
import { CustomJs, type CustomJsConfig } from "./action/CustomJS";
import { useEffect, useState } from "react";
import { useComponentsStore } from "../../stores/components";
import {
  ComponentMethod,
  type ComponentMethodConfig,
} from "./action/ComponentMethod";

const actionMap = {
  goToLink: "访问链接",
  showMessage: "消息提示",
  componentMethod: "组件方法",
  customJs: "自定义JS",
};
const allTabs = ["访问链接", "消息提示", "组件方法", "自定义JS"];
interface ModelProps {
  visiable: boolean;
  event?: ComponentEvent;
  action?: ActionConfig;
  handleOK: (config?: ActionConfig) => void;
  handleCancel: () => void;
}
export type ActionConfig =
  | GotoLinkConfig
  | ShowMessageConfig
  | CustomJsConfig
  | ComponentMethodConfig;

export function ActionModel({
  action,
  visiable,
  handleOK,
  handleCancel,
}: ModelProps) {
  const { curComponent } = useComponentsStore();
  if (!curComponent) {
    return;
  }
  const [curConfig, setCurConfig] = useState<ActionConfig>();
  const [key, setKey] = useState<string>("访问链接");
  useEffect(() => {
    if (action?.type) {
      setKey(actionMap[action.type]);
    }
  }, [action]);
  return (
    <>
      <Modal
        title="事件动作配置"
        width={800}
        open={visiable}
        onOk={() => handleOK(curConfig)}
        onCancel={handleCancel}
        okText="添加"
        cancelText="取消"
      >
        <div className="h-[500px]">
          <Segmented
            value={key}
            onChange={(value) => setKey(value)}
            block
            options={allTabs}
          ></Segmented>
          <div className="pt-[20px] h-[calc(100vh-60px-30px-20px)]">
            {key === "访问链接" && (
              <GoToLink
                onChange={(config) => {
                  setCurConfig(config);
                }}
                defaultValue={action?.type === "goToLink" ? action.url : ""}
              />
            )}
            {key === "消息提示" && (
              <ShowMessage
                onChange={(config) => {
                  setCurConfig(config);
                }}
                value={
                  action?.type === "showMessage" ? action.config : undefined
                }
              />
            )}
            {key === "自定义JS" && (
              <CustomJs
                onChange={(config) => {
                  setCurConfig(config);
                }}
                value={action?.type === "customJs" ? action.code : ""}
              ></CustomJs>
            )}
            {key === "组件方法" && (
              <ComponentMethod
                onChange={(config) => {
                  setCurConfig(config);
                }}
                value={
                  action?.type === "componentMethod" ? action.config : undefined
                }
              ></ComponentMethod>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
