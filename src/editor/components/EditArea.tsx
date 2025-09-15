import {
  createElement,
  useEffect,
  useState,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { useComponentsStore, type Component } from "../stores/components";
import { useComponentConfigsStore } from "../stores/componentsConfig";
import { HoverMask } from "./HoverMask";
import { SelectedMask } from "./SelectedMask";
export function EditArea() {
  const { components, addComponent, curComponentId, setCurComponent, mode } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigsStore();
  console.log(components);
  const [overId, setOverId] = useState<number>();

  const handleOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();
    for (let i of path) {
      const comId = (i as HTMLElement).dataset?.componentId;
      if (comId) {
        setOverId(+comId);
        return;
      }
    }
  };
  const hanldeLeave: MouseEventHandler = (e) => {
    setOverId(undefined);
  };
  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();
    for (let i of path) {
      const compId = (i as HTMLElement).dataset?.componentId;
      if (compId) {
        setCurComponent(+compId);
        return;
      }
    }
  };
  function renderComponent(components: Component[]): ReactNode {
    if (mode !== "edit") {
      return;
    }
    return components.map((item: Component) => {
      const init = componentConfig[item.name];
      if (!init) {
        return null;
      }
      return createElement(
        init.dev,
        {
          key: item.id,
          id: item.id,
          name: item.name,
          ...init.defaultProps,
          ...item.props,
          styles: { ...item.styles },
        },
        renderComponent(item.children || [])
      );
    });
  }

  return (
    <div
      className="h-[100%] edit-area"
      onMouseOver={handleOver}
      onMouseLeave={hanldeLeave}
      onClick={handleClick}
    >
      {overId && overId !== curComponentId && (
        <HoverMask
          containerClassName="edit-area"
          protalWrapperClassName="protal-wrapper"
          componentId={overId}
        ></HoverMask>
      )}
      {curComponentId && curComponentId != 1 && (
        <SelectedMask
          containerClassName="edit-area"
          protalWrapperClassName="protal-wrapper"
          componentId={curComponentId}
        ></SelectedMask>
      )}
      {renderComponent(components)}
      <div className="protal-wrapper"></div>
    </div>
  );
}
