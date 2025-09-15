import type { PropsWithChildren } from "react";
import { Button as AntdButton } from "antd";
import type { ButtonType } from "antd/es/button";
import type { CommonComponentProps } from "../../interface";
export interface ButtonProps {
  type: ButtonType;
  text: string;
}
const Button = ({ type, id, styles, text, ...props }: CommonComponentProps) => {
  console.log(props)
  return (
    <AntdButton type={type} style={styles} {...props}>
      {text}
    </AntdButton>
  );
};
export default Button;
