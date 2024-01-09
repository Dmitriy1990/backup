import { Modal } from "components/modal";
import React, { FC } from "react";
import styles from "./style.module.scss";
import { IconError, IconSuccess } from "assets";
import { Button } from "components/button";
import clsx from "clsx";
import useWindowSize from "hooks/useWindowSize";

type Props = {
  open: boolean;
  onClose: () => void;
  type: "success" | "error";
};

export const ResultModal: FC<Props> = ({ open, onClose, type }) => {
  const isSuccess = type === "success";
  const size = useWindowSize();
  return (
    <Modal open={open} onClose={onClose} className={"modal"} right={size < 600}>
      <div className={clsx("box modal__inner center")}>
        {isSuccess ? (
          <IconSuccess className={styles.icon} />
        ) : (
          <IconError className={styles.icon} />
        )}
        <h3 className={clsx(styles.title, "semibold")}>
          {isSuccess ? "Successful" : "Error"}
        </h3>
        <p className={styles.desc}>
          {isSuccess ? "User added." : "The user has not been added."}
        </p>
        <Button variant="primary" onClick={onClose}>
          Okay
        </Button>
      </div>
    </Modal>
  );
};
