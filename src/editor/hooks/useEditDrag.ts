import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import type { CommonComponentProps } from "../interface";

export function useEditDrag(
  { name, id }: CommonComponentProps,
  ref: React.RefObject<null>
) {
  const [_, drag] = useDrag({
    type: name,
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    item: {
      type: name,
      dragType: "move",
      id: id,
    },
  });
  useEffect(() => {
    drag(ref);
  }, []);
}
