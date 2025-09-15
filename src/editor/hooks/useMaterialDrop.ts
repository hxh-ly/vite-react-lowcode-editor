import { useEffect, useRef } from "react";
import { getComponentById, useComponentsStore } from "../stores/components";
import { useComponentConfigsStore } from "../stores/componentsConfig";
import { useDrop } from "react-dnd";

export function useMaterialDrop(accept: string[], id: number) {
  const dropRef = useRef(null);
  const { components, addComponent, deleteComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigsStore();
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: accept,
    drop(item: { type: string; dragType?: string; id?: number }, monitor) {
      if (monitor.didDrop()) {
        return;
      }
      const comp = componentConfig[item.type];
      if (item.dragType === "move") {
        const comp = getComponentById(item.id!, components);
        if (comp) {
          deleteComponent(item.id!);
          addComponent(comp!, id);
        }
      } else {
        if (comp) {
          addComponent(
            {
              id: new Date().getTime(),
              props: comp.defaultProps,
              name: item.type,
              desc: comp.desc,
            },
            id
          );
        }
      }
    },
    collect(monitor) {
      return {
        canDrop: monitor.canDrop(),
      };
    },
  }));
  useEffect(() => {
    drop(dropRef);
  }, []);
  return { dropRef, canDrop };
}
