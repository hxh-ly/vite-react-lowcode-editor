import { message } from "antd";
import { useEffect, useMemo, useRef, type PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import { useComponentsStore } from "../../stores/components";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { Table as AntdTable } from "antd";
import { useEditDrag } from "../../hooks/useEditDrag";
import React from "react";
const Table = ({ id, children, styles, name }: CommonComponentProps) => {
  const { dropRef, canDrop } = useMaterialDrop(["TableColumn"], id);
  useEditDrag({ id, name }, dropRef);
  const columns = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        title: (
          <div className="m-[1px]" data-component-id={item.props.id}>
            {item.props?.title}
          </div>
        ),
        dataIndex: item.props?.dataIndex,
        key: item,
      };
    });
  }, [children]);
  return (
    <div
      ref={dropRef}
      data-component-id={id}
      className="w-[100%]"
      style={{ border: canDrop ? "2px solid blue" : "none", ...styles }}
    >
      <AntdTable
        columns={columns}
        dataSource={[]}
        pagination={false}
      ></AntdTable>
    </div>
  );
};
export default Table;
