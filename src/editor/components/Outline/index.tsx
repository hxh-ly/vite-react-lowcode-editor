import { Tree, type TreeDataNode, type TreeProps } from "antd";
import { useComponentsStore, type Component } from "../../stores/components";
import Title from "antd/es/skeleton/Title";

const treeData: TreeDataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1677ff" }}>sss</span>,
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];


export function Outline() {
  const { components, curComponent, setCurComponent,curComponentId } = useComponentsStore();
  const onSelect = (selectedKeys: React.Key[]) => {
    console.log(selectedKeys);
    setCurComponent(selectedKeys[0] as number);
  };

  return (
    <>
      <Tree
        fieldNames={{ title: "desc", key: "id" }}
        defaultExpandAll
        showLine
        onSelect={onSelect}
        treeData={components as any}
        selectedKeys={[curComponentId||0]}
      />
    </>
  );
}
