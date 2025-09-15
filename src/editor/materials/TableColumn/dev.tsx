import { message } from "antd";
import { useEffect, useMemo, useRef, type PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import { useComponentsStore } from "../../stores/components";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { Table as AntdTable } from "antd";
const TableColumn = (props: CommonComponentProps) => {
  return <></>;
};
export default TableColumn;
