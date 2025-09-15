import type { CSSProperties } from "react";
import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
export interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
  parentId?: number;
  desc?: string;
  styles?: CSSProperties;
}

interface State {
  components: Component[];
  curComponentId?: number | null;
  curComponent?: Component | null;
  mode: "edit" | "preview";
}
interface Action {
  addComponent: (item: Component, parentId?: number) => void;
  deleteComponent: (id: number) => void;
  updateComponentProps: (id: number, props: any) => void;
  setCurComponent: (id: number | null) => void;
  updateComponentStyle: (
    id: number,
    style: CSSProperties,
    replace?: boolean
  ) => void;
  setMode: (m: "edit" | "preview") => void;
}
const creator: StateCreator<State & Action> = (set, get) => {
  return {
    components: [
      {
        id: 1,
        name: "Page",
        props: {},
        desc: "页面",
      },
    ],
    curComponent: null,
    curComponentId: null,
    mode: "edit",
    addComponent: (item: Component, parentId?: number) => {
      set((state) => {
        console.log({ parentId });
        if (parentId != undefined) {
          let comp = getComponentById(parentId, state.components);
          if (comp) {
            if (comp.children) {
              console.log("addComponent push");
              comp.children.push(item);
            } else {
              console.log("addComponent init");
              comp.children = [item];
            }
          }
          item.parentId = parentId;
          return { components: [...state.components] };
        }
        return { components: [...state.components, item] };
      });
    },
    deleteComponent: (id: number) => {
      if (!id) {
        return;
      }
      const comp = getComponentById(id, get().components);
      if (comp && comp.parentId) {
        const parentComp = getComponentById(comp.parentId, get().components);
        if (parentComp) {
          parentComp.children = parentComp.children?.filter((v) => v.id !== id);
        }
      }
      set({ components: [...get().components] });
    },
    updateComponentProps: (id: number, props: any) => {
      if (!id) {
        return;
      }
      const comp = getComponentById(id, get().components);
      if (!comp) {
        return;
      }
      set((state) => {
        comp.props = { ...comp.props, ...props };
        return { components: [...state.components] };
      });
    },
    setCurComponent: (id: number) => {
      set((state) => {
        return {
          curComponentId: id,
          curComponent: getComponentById(id, state.components),
        };
      });
    },
    updateComponentStyle: (
      id: number,
      styles: CSSProperties,
      replace?: boolean
    ) => {
      set((state) => {
        const comp = getComponentById(id, state.components);
        if (!comp) {
          return { components: [...state.components] };
        }
        comp.styles = replace ? { ...styles } : { ...comp?.styles, ...styles };
        console.log(comp.styles);
        return { components: [...state.components] };
      });
    },
    setMode: (m: "edit" | "preview") => {
      set((state) => {
        return {
          mode: m,
        };
      });
    },
  };
};
export const useComponentsStore = create<State & Action>()(
  persist(creator, {
    name: "useComponentsStore",
  })
);

export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) {
    return null;
  }
  for (let item of components) {
    if (item.id === id) {
      return item;
    }
    if (item.children && item.children.length) {
      let resComponent: Component | null = getComponentById(id, item.children);
      if (resComponent) {
        return resComponent;
      }
    }
  }
  return null;
}
