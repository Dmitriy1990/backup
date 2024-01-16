import React, { useState, FC, useRef } from "react";
import styles from "./style.module.scss";
import useOnClickOutside from "hooks/useOutsideHook";
import { IconArrowDown } from "assets";
import clsx from "clsx";
import { Scrollbars } from "rc-scrollbars";

type Props = {
  options: string[];
  selectItem: null | string;
  setSelectItem: (v: null | string) => void;
  error: boolean;
  placeholder?: string;
};

export const SelectComponent: FC<Props> = ({
  options,
  selectItem,
  setSelectItem,
  error,
  placeholder = "Select Role",
}) => {
  const [show, setShow] = useState(false);

  const ref = useRef(null);

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const openSelect = () => {
    setShow(!show);
  };

  const onSelect = (item: string) => {
    setSelectItem(item);
    setShow(false);
  };

  return (
    <div className={styles.wrappper} ref={ref}>
      <div
        className={clsx(styles.select, error && styles.error)}
        onClick={openSelect}
      >
        <span className={styles.select__label}>
          {selectItem ? selectItem : placeholder}
        </span>
        <span className={styles.select__icon}>
          <IconArrowDown />
        </span>
      </div>
      <div className={clsx(styles.list, show && styles.open)}>
        <Scrollbars autoHeight autoHeightMax={200} autoHide universal={true}>
          {options.map((item, id) => (
            <div
              className={styles.list__item}
              key={id}
              onClick={() => onSelect(item)}
            >
              <p className="bold">{item}</p>
            </div>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};
