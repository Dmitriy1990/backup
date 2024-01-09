import clsx from "clsx";
import React, { FC, ReactNode, useEffect, useRef } from "react";

import { Ripple } from "./Ripple";
import style from "./style.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
  fullwidth?: boolean;
  onClick?: () => void;
  variant?: "primary" | "outline";
  disabled?: boolean;
};

export const Button: FC<Props> = ({
  children,
  className,
  onClick,
  fullwidth,
  disabled,
  variant,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        style.button,
        fullwidth && style.fullwidth,
        variant && style[variant],
        className
      )}
    >
      {children}
      <Ripple />
    </button>
  );
};
