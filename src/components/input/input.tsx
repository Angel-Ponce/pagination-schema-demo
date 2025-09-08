import { InputHTMLAttributes } from "react";
import styles from "./input.module.css";
import clsx from "clsx";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return <input {...props} className={clsx(styles.input, props.className)} />;
};
