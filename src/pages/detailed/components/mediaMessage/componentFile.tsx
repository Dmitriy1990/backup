import React, { FC } from "react";
import { Message } from "types/message";
import clsx from "clsx";
import {
  IconLogo,
  IconCalendar,
  IconBack,
  IconInfo,
  IconFile,
  IconMicro,
} from "assets";
import styles from "./style.module.scss";


type Props = {
  item: Message;
  getFile: (id: number) => void;
};

export const ComponentFile: FC<Props> = ({ item, getFile }) => {
  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
  //"audio/ogg"
  return (
    <>
      <div className={clsx(styles.account__item, styles.file)}>
        <div className={clsx(styles.file__ava, styles.red)}>
          <IconFile />
        </div>
        <div className={styles.account__detail}>
          <div className={styles.account__header}>
            <h4
              className={clsx(styles.account__name, "bold")}
              onClick={() => getFile(item.id)}
            >
              {item?.fileName ? item.fileName : "-"}
            </h4>
          </div>
          <p className={clsx(styles.account__text, "ellipsis grey")}>
            {item.size ? formatBytes(item.size) : 0}
          </p>
        </div>
      </div>
    </>
  );
};
