import { useEffect, useRef, type PropsWithChildren } from "react";
import { Button as AntdButton } from "antd";
import type { ButtonType } from "antd/es/button";
import type { CommonComponentProps } from "../../interface";
import { useDrag } from "react-dnd";
import { useEditDrag } from "../../hooks/useEditDrag";
export interface ButtonProps {
  type: ButtonType;
  text: string;
}
const Button = (props: CommonComponentProps) => {
  const ref = useRef(null);
  useEditDrag(props, ref);
  return (
    <AntdButton
      ref={ref}
      data-component-id={props.id}
      type={props.type}
      style={props.styles}
    >
      {props.text}
    </AntdButton>
  );
};
export default Button;
