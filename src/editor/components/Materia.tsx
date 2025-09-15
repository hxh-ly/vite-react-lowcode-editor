import MaterialItem from "./MaterialItem";
import { useComponentConfigsStore } from "../stores/componentsConfig";
import { useMemo } from "react";
export function Material() {
  const { componentConfig } = useComponentConfigsStore();
  const allItem = useMemo(() => {
    return Object.values(componentConfig);
  }, [componentConfig]);
  return (
    <div>
      {allItem.map((item, index) => {
        return (
          <MaterialItem key={item.name + index} name={item.name} ></MaterialItem>
        );
      })}
    </div>
  );
}
