import clsx from "clsx";
import { FC, ReactNode, useEffect } from "react";
import { animated, useTransition } from "react-spring";

import { Portal } from "../portal";
import styled from "./style.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  bottom?: boolean;
  noClickOutSide?: boolean;
  list?: boolean;
  className?: string;
  right?: boolean;
  notBg?: boolean;
};

export const Modal: FC<Props> = ({
  open,
  onClose,
  children,
  bottom,
  noClickOutSide,
  list,
  className,
  right,
  notBg,
}: Props) => {
  const pos = right ? "X" : "Y";

  const pc = {
    from: { opacity: 0, transform: `translate${pos}(-100%)` },
    enter: { opacity: 1, transform: `translate${pos}(0px)` },
    leave: { opacity: 0, transform: `translate${pos}(-100%)` },
  };

  const transitions = useTransition(open, pc);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target && !noClickOutSide) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return transitions(
    (styles, item) =>
      item && (
        <Portal>
          <div
            className={clsx(styled.wrap, notBg && styled.notBg)}
            onClick={handleContainerClick}
          >
            <animated.div
              style={styles}
              className={clsx(
                styled.anim,
                bottom && styled.bottom,
                list && styled.list,
                className
              )}
            >
              <div className={styled.modal}>
                <>{children}</>
              </div>
            </animated.div>
          </div>
        </Portal>
      )
  );
};
