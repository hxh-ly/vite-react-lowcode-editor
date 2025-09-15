import { message } from "antd";
import { useEffect, useRef, type PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import { useComponentsStore } from "../../stores/components";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
const Page = ({ id, children,styles }: CommonComponentProps) => {
  const { dropRef, canDrop } = useMaterialDrop(["Button", "Container",'Modal','Table','Form'], id);
  return (
    <div
      ref={dropRef}
      data-component-id={id}
      className="p-[20px] h-[100%] box-border"
      style={{ border: canDrop ? "2px solid blue" : "none" ,...styles}}
    >
      {children}
    </div>
  );
};
export default Page;
