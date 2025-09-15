import { useEffect, useRef, type PropsWithChildren } from "react";
import { useComponentsStore } from "../../stores/components";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
const Container = ({
  id,
  name,
  children,
  styles,
  ...props
}: CommonComponentProps) => {
  return (
    <div style={styles} className={`min-h-[100px] p-[20px] `} {...props}>
      {children}
    </div>
  );
};
export default Container;
