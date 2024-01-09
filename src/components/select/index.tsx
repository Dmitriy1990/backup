import React, { useState, FC, useRef } from "react";
import styles from "./style.module.scss";
import useOnClickOutside from "hooks/useOutsideHook";
import { IconArrowDown } from "assets";
import clsx from "clsx";

type Props = {
  options: string[];
  selectItem: null | string;
  setSelectItem: (v: null | string) => void;
};

export const SelectComponent: FC<Props> = ({
  options,
  selectItem,
  setSelectItem,
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
      <div className={styles.select} onClick={openSelect}>
        <span className={styles.select__label}>
          {selectItem ? selectItem : "Select Role"}
        </span>
        <span className={styles.select__icon}>
          <IconArrowDown />
        </span>
      </div>
      <div className={clsx(styles.list, show && styles.open)}>
        {options.map((item, id) => (
          <div
            className={styles.list__item}
            key={id}
            onClick={() => onSelect(item)}
          >
            <p className="bold">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
