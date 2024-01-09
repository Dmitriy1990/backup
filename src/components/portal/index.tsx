import React, { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

export const Portal: React.FC<Props> = ({ children }: Props) => {
  const div = React.useMemo(() => document.createElement("div"), []);
  useEffect(() => {
    document.body.appendChild(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);

  return createPortal(children, div);
};
