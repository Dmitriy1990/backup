import React, { FC } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";

type Props = {
  img?: string;
  className?: string;
  name?: string;
};

export const Avatar: FC<Props> = ({ img, className, name }) => {
  const nameChars = (name: string) => {
    const nameArr = name.split(" ");
    if (nameArr.length > 1) {
      return nameArr[0][0] + nameArr[1][0];
    } else {
      return nameArr[0][0];
    }
  };
  return (
    <div className={clsx(styles.avatar, className && className)}>
      {img ? (
        <img src={img} className={styles.img} />
      ) : (
        <span className={styles.avatar__text}>
          {name ? nameChars(name) : "-"}
        </span>
      )}
    </div>
  );
};
