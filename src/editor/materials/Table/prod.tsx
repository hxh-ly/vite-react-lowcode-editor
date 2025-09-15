import { message } from "antd";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import { useComponentsStore } from "../../stores/components";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { Table as AntdTable } from "antd";
import { useEditDrag } from "../../hooks/useEditDrag";
import React from "react";
import dayjs from "dayjs";
const Table = ({ id, children, styles, name, url }: CommonComponentProps) => {
  console.log(`Table req ${url}`);

  const [data, setData] = useState<{ id: number; date: Date }[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setData([{ id: 0, date: new Date() }]);
    });
  }, []);
  const columns = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        title: (
          <div className="m-[1px]" data-component-id={item.props.id}>
            {item.props?.title}
          </div>
        ),
        dataIndex: item.props?.dataIndex,
        key: item.props?.dataIndex,
        render: (record: any) => {
          return item.props.type === "date"
            ? dayjs(record).format("YYYY-MM-DD")
            : record;
        },
      };
    });
  }, [children]);
  return (
    <div className="w-[100%]">
      <AntdTable
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.id + ""}
      ></AntdTable>
    </div>
  );
};
export default Table;
