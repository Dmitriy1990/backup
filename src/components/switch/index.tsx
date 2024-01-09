import clsx from "clsx";
import React, { FC } from "react";

import styles from "./style.module.scss";

type Props = {
  id?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  className?: string;
  disabled?: boolean;
};

export const Switch: FC<Props> = ({
  id = "id",
  name,
  checked,
  onChange,
  className,
  disabled,
}) => {
  return (
    <div className={clsx(styles.wrapper)}>
      <input
        className={clsx(styles.checkbox, className)}
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />

      <label
        className={clsx(styles.label, disabled && styles.disabled)}
        htmlFor={id}
      />
    </div>
  );
};
