import { useEffect, useRef, type PropsWithChildren } from "react";
import { useComponentsStore } from "../../stores/components";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { useEditDrag } from "../../hooks/useEditDrag";
const Container = (props: CommonComponentProps) => {
  const { dropRef, canDrop } = useMaterialDrop(
    ["Button", "Container",'Table','Form'],
    props.id
  );
  useEditDrag(props, dropRef);
  return (
    <div
      ref={dropRef}
      style={props.styles}
      data-component-id={props.id}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
    >
      {props.children}
    </div>
  );
};
export default Container;
