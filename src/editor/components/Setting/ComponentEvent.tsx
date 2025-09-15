import { Button, Collapse, Input, Select } from "antd";
import { getComponentById, useComponentsStore } from "../../stores/components";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import { GoToLink, type GotoLinkConfig } from "./action/GoToLink";
import { ShowMessage, type ShowMessageConfig } from "./action/ShowMessage";
import { ActionModel, type ActionConfig } from "./ActionModel";
import { useState } from "react";
import type { ComponentEvent } from "../../stores/componentsConfig";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
export function ComponentEvent() {
  const { components, setCurComponent, curComponent, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigsStore();
  if (!curComponent) {
    return null;
  }
  const [curActon, setCurAction] = useState<ActionConfig>();
  const [curIdx, setCurIdx] = useState<number>();
  function deleteAction(event: string, idx: number) {
    let ac = curComponent?.props?.[event]?.actions || [];
    ac.splice(idx, 1);
    updateComponentProps(curComponent!.id, { [event]: { actions: ac } });
  }
  function editAction(event: string, idx: number) {
    let ac = curComponent?.props?.[event]?.actions;
    if (!curComponent || !ac?.length) {
      return;
    }
    setSelectEvent(componentConfig[curComponent.name].events?.find(v=>v.name===event));
    setCurIdx(idx);
    setCurAction(ac[idx]);
    isOnSHow(true);
  }
  const [onShow, isOnSHow] = useState(false);
  const [selectEvent, setSelectEvent] = useState<ComponentEvent>();
  const items = (componentConfig[curComponent.name].events || []).map(
    (item, idx) => {
      return {
        key: item.name,
        label: (
          <div className="flex justify-between leading-[30px]">
            {item.label}
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                setSelectEvent(item);
                isOnSHow(true);
              }}
            >
              添加动作
            </Button>
          </div>
        ),
        children: (
          <div>
            {(curComponent.props[item.name]?.actions || []).map(
              (itemConfig: ActionConfig, index: number) => {
                return (
                  <div key={index}>
                    {itemConfig.type === "goToLink" ? (
                      <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                        <div className="text-[blue]">跳转链接</div>
                        <div>{itemConfig.url}</div>
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            cursor: "pointer",
                          }}
                          onClick={() => deleteAction(item.name, index)}
                        >
                          <DeleteOutlined />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 30,
                            cursor: "pointer",
                          }}
                          onClick={() => editAction(item.name, index)}
                        >
                          <EditOutlined />
                        </div>
                      </div>
                    ) : null}
                    {itemConfig.type === "showMessage" ? (
                      <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                        <div className="text-[blue]">消息弹窗</div>
                        <div>{itemConfig.config.type}</div>
                        <div>{itemConfig.config.text}</div>
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            cursor: "pointer",
                          }}
                          onClick={() => deleteAction(item.name, index)}
                        >
                          <DeleteOutlined />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 30,
                            cursor: "pointer",
                          }}
                          onClick={() => editAction(item.name, index)}
                        >
                          <EditOutlined />
                        </div>
                      </div>
                    ) : null}
                    {itemConfig.type === "customJs" ? (
                      <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                        <div className="text-[blue]">自定义JS</div>
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            cursor: "pointer",
                          }}
                          onClick={() => deleteAction(item.name, index)}
                        >
                          <DeleteOutlined />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 30,
                            cursor: "pointer",
                          }}
                          onClick={() => editAction(item.name, index)}
                        >
                          <EditOutlined />
                        </div>
                      </div>
                    ) : null}
                    {itemConfig.type === "componentMethod" ? (
                      <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                        <div className="text-[blue]">组件方法</div>
                        <div>
                          {
                            getComponentById(itemConfig.config.id, components)
                              ?.desc
                          }
                        </div>
                        <div>{itemConfig.config.id}</div>
                        <div>{itemConfig.config.method}</div>
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            cursor: "pointer",
                          }}
                          onClick={() => deleteAction(item.name, index)}
                        >
                          <DeleteOutlined />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 30,
                            cursor: "pointer",
                          }}
                          onClick={() => editAction(item.name, index)}
                        >
                          <EditOutlined />
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }
            )}
          </div>
        ),
      };
    }
  );
  const handleOk = (config?: ActionConfig) => {
    if (!curComponent || !config) {
        console.log(config)
      return;
    }
    if (curActon) {
      let actions = curComponent.props[selectEvent!.name]?.actions;
      actions[curIdx!] = {
        ...config,
      };
      updateComponentProps(curComponent.id, {
        [selectEvent!.name]: {
          actions: [...(curComponent.props[selectEvent!.name]?.actions || [])],
        },
      });
    } else {
      updateComponentProps(curComponent.id, {
        [selectEvent!.name]: {
          actions: [
            ...(curComponent.props[selectEvent!.name]?.actions || []),
            config,
          ],
        },
      });
    }
    setCurAction(undefined);
    isOnSHow(false);
  };
  return (
    <div className="px-[10px]">
      <Collapse
        items={items}
        className="mb-[10px]"
        defaultActiveKey={
          componentConfig[curComponent.name]?.events?.map(
            (item) => item.name
          ) || []
        }
      ></Collapse>
      <ActionModel
        visiable={onShow}
        handleOK={handleOk}
        action={curActon}
        handleCancel={() => {
          isOnSHow(false);
          setCurAction(undefined);
        }}
        event={selectEvent}
      ></ActionModel>
    </div>
  );
}
