import { message } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { useDrop } from "react-dnd";
import type { CommonComponentProps } from "../../interface";
import { Modal as AntdModal } from "antd";
export interface ModalRef {
  open: () => void;
  close: () => void;
}
const Model = forwardRef<ModalRef, CommonComponentProps>(
  ({ children, title, onOk, onCancel, styles }, ref) => {
    const [visiable, setVisiable] = useState(false);
    useImperativeHandle(
      ref,
      () => {
        return {
          open: () => {
            setVisiable(true);
          },
          close: () => {
            setVisiable(false);
          },
        };
      },
      []
    );
    return (
      <AntdModal
        title={title}
        open={visiable}
        onOk={() => {
          onOk && onOk();
           setVisiable(false);
        }}
        onCancel={() => {
          onCancel && onCancel();
          setVisiable(false);
        }}
      >{children}</AntdModal>
    );
  }
);
export default Model;
