import { Modal } from "components/modal";
import React, { FC } from "react";

import { IconError, IconSuccess } from "assets";
import { Button } from "components/button";
import clsx from "clsx";
import useWindowSize from "hooks/useWindowSize";
import styles from "../readingModal/style.module.scss";
import { Jobs } from "types/jobs";

type Props = {
  open: boolean;
  onClose: () => void;
  onDelete: (jobName: string, jobGroup: string) => void;
  job: Jobs | undefined;
};

export const ConfirmModal: FC<Props> = ({ open, onClose, job, onDelete }) => {
  const size = useWindowSize();
  return (
    <Modal open={open} onClose={onClose} className={"modal"} right={size < 600}>
      <div className={clsx("box modal__inner center")}>
        <IconError className={styles.icon} />

        <h3 className={clsx(styles.title, "semibold")}>Confirmation</h3>
        <p className={styles.desc}>
          Do you really want to delete the account{" "}
          {job?.accountUserName ? job?.accountUserName : "-"} (
          {job?.accountPhone ? job?.accountPhone : "-"}) ?
        </p>
        <div className={styles.buttons}>
          {job && (
            <Button
              variant="primary"
              onClick={() => onDelete(job.jobName, job.jobGroup)}
            >
              Delete
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
