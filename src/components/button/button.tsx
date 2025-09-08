import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";
import clsx from "clsx";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        styles.button,
        styles[props.variant ?? "primary"],
        props.className
      )}
    />
  );
};
