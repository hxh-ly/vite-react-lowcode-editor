import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { Modal as AntdModal } from "antd";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { useEditDrag } from "../../hooks/useEditDrag";
const Model = (props: CommonComponentProps) => {
  const { dropRef, canDrop } = useMaterialDrop(
    ["Button", "Container",'Table','Form'],
    props.id
  );
  useEditDrag(props, dropRef);
  return (
    <div
      ref={dropRef}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
      style={{ ...props.styles }}
      data-component-id={props.id}
    >
      <h4>{props.title}</h4>
      {props.children}
    </div>
  );
};
export default Model;
