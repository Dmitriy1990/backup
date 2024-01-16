import React, { FC } from "react";
import { Message } from "types/message";
import styles from "./style.module.scss";
import { IconDownload } from "assets";

type Props = {
  item: Message;
  getFile: (id: number) => void;
};

export const ImageFile: FC<Props> = ({ item, getFile }) => {
  // image / jpeg;
  // image / gif;
  // image / png;
  // image / webp;

  return (
    <div className={styles.image}>
      <div className={styles.download} onClick={() => getFile(item.id)}>
        <IconDownload className={styles.download__icon} />
      </div>
      <img
        src={`data:${item.mimeType};base64,${item?.thumb ? item!.thumb : ""}`}
        alt=""
      />
    </div>
  );
};
