import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { getComponentById, useComponentsStore } from "../../stores/components";
import { Dropdown, Popconfirm, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
export interface SelectedMaskProps {
  containerClassName: string;
  componentId: number;
  protalWrapperClassName: string;
}
export interface PositionState {
  left: number;
  top: number;
  width: number;
  height: number;
  labelLeft: number;
  labelTop: number;
}
export function SelectedMask(props: SelectedMaskProps) {
  const { components, deleteComponent, setCurComponent } = useComponentsStore();
  const { containerClassName, componentId, protalWrapperClassName } = props;
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelLeft: 0,
    labelTop: 0,
  });

  function updatePosition() {
    if (!componentId) {
      return;
    }
    const container = document.querySelector(`.${containerClassName}`);
    if (!container) {
      return;
    }
    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) {
      return;
    }
    const { top, left } = container.getBoundingClientRect();
    const {
      top: nodeTop,
      left: nodeLeft,
      width: nodeWidth,
      height: nodeHeight,
    } = node.getBoundingClientRect();
    //console.log(nodeWidth);
    let labelTop = nodeTop - top + container!.scrollTop;
    let labelLeft = nodeLeft - left + nodeWidth;
    if (labelTop <= 0) {
      labelTop -= -20;
    }
    setPosition({
      top: nodeTop - top + container!.scrollTop,
      left: nodeLeft - left + container!.scrollLeft,
      width: nodeWidth,
      height: nodeHeight,
      labelTop: labelTop,
      labelLeft: labelLeft,
    });
  }
  function handleDelete() {
    deleteComponent(componentId);
    setCurComponent(null);
  }
  useEffect(() => {
    updatePosition();
  }, [componentId]);
  const el = useMemo(() => {
    return document.querySelector(`.${protalWrapperClassName}`)!;
  }, []);
  if(!el) {
    return null;
  }
  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);
  useEffect(() => {
    updatePosition();
  }, [components]);
  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, []);
  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = curComponent;

    while (component?.parentId) {
      component = getComponentById(component.parentId, components)!;
      parentComponents.push(component);
    }

    return parentComponents;
  }, [curComponent]);
  return createPortal(
    <>
      <div
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          backgroundColor: "rgba(0, 0, 255, 0.05)",
          border: "1px dashed blue",
          pointerEvents: "none",
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: "border-box",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: "14px",
          zIndex: 13,
          display: !position.width || position.width < 10 ? "none" : "inline",
          transform: "translate(-100%, -100%)",
        }}
      >
        <Space>
          <Dropdown
            menu={{
              items: parentComponents.map((v) => {
                return {
                  key: v?.id + "",
                  label: v?.desc,
                };
              }),
              onClick: ({ key }) => {
                setCurComponent(+key);
              },
            }}
            disabled={parentComponents.length === 0}
          >
            <div
              style={{
                padding: "0 8px",
                backgroundColor: "blue",
                borderRadius: 4,
                color: "#fff",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {curComponent?.desc}
            </div>
          </Dropdown>
          {componentId !== 1 && (
            <div style={{ padding: "0 8px", backgroundColor: "blue" }}>
              <Popconfirm
                title="确认删除？"
                okText="确认"
                cancelText="取消"
                onConfirm={handleDelete}
              >
                <DeleteOutlined style={{ color: "#fff" }}></DeleteOutlined>
              </Popconfirm>
            </div>
          )}
        </Space>
      </div>
    </>,
    el
  );
}
