import clsx from "clsx";
import React, { ChangeEvent, FC, ReactElement, ReactNode } from "react";

import styles from "./style.module.scss";

type Props = {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value?: string;
  name?: string;
  children?: ReactNode;
  bgColor?: string;
  disabled?: boolean;
  className?: string;
};

export const Checkbox: FC<Props> = (props: Props): ReactElement => {
  const {
    checked,
    onChange,
    label,
    name,
    children,
    bgColor,
    disabled,
    className,
  } = props;
  return (
    <label className={clsx(styles["label-container"], className && className)}>
      <input
        className={styles.input}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span
        className={clsx(styles["checkbox-icon"], bgColor && styles[bgColor])}
      />
      {children}
    </label>
  );
};
