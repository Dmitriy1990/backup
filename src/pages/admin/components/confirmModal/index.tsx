import { Modal } from "components/modal";
import React, { FC } from "react";

import { IconError, IconSuccess } from "assets";
import { Button } from "components/button";
import clsx from "clsx";
import useWindowSize from "hooks/useWindowSize";
import styles from "../readingModal/style.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const ConfirmModal: FC<Props> = ({ open, onClose }) => {
  const size = useWindowSize();
  return (
    <Modal open={open} onClose={onClose} className={"modal"} right={size < 600}>
      <div className={clsx("box modal__inner center")}>
        <IconError className={styles.icon} />

        <h3 className={clsx(styles.title, "semibold")}>Confirmation</h3>
        <p className={styles.desc}>
          Do you really want to delete the account @Zemmerman (+7 905 222 3456)
          ?
        </p>
        <div className={styles.buttons}>
          <Button variant="primary" onClick={onClose}>
            Delete
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
