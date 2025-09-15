import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { getComponentById, useComponentsStore } from "../../stores/components";

export interface HoverMaskProps {
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
export function HoverMask(props: HoverMaskProps) {
  const { components } = useComponentsStore();
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
    // console.log(nodeWidth);
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
  useEffect(() => {
    updatePosition();
  }, [componentId]);
  const el = useMemo(() => {
    return document.querySelector(`.${protalWrapperClassName}`)!;
  }, []);
  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);
  useEffect(() => {
    updatePosition();
}, [components]);
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
      </div>
    </>,
    el
  );
}
