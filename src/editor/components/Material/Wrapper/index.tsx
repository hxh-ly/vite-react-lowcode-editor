import { useState } from "react";
import { Segmented } from "antd";
import { Material } from "../../Materia";
import { Outline } from "../../Outline";
import { Source } from "../../Source";
export function MaterialWrapper() {
  const [key, setKey] = useState("物料");
  return (
    <>
      <Segmented
        block
        options={["物料", "大纲", "源码"]}
        onChange={setKey}
      ></Segmented>
      <div className="pt-[20px] h-[calc(100vh-60px-30px-20px)]">
        {key === "物料" && <Material />}
        {key === "大纲" && <Outline />}
        {key === "源码" && <Source />}
      </div>
    </>
  );
}
