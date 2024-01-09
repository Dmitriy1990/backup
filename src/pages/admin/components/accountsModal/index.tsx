import { Modal } from "components/modal";
import React, { FC } from "react";
import styles from "./style.module.scss";
import { IconBack, IconClose, IconError, IconSuccess } from "assets";
import { Button } from "components/button";
import clsx from "clsx";
import useWindowSize from "hooks/useWindowSize";
import { Checkbox } from "components/checkbox";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AccountsModal: FC<Props> = ({ open, onClose }) => {
  const size = useWindowSize();
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={clsx("modal", styles.modal)}
      right={size < 600}
      notBg
    >
      <div className={clsx("box modal__inner", styles.content)}>
        <div className={styles.header}>
          <IconBack className={styles.header__back} onClick={onClose} />
          <h4 className={clsx("bold", styles.header__title)}>
            Reading accounts
          </h4>
          <IconClose className={styles.header__icon} onClick={onClose} />
        </div>
        <div className={clsx(styles.form, "field-wrap")}>
          <input
            type="text"
            placeholder="Search TG Account"
            className="field "
          />
        </div>
        <div className={styles.result}>
          <Checkbox className={styles.checkbox}>
            <span className={styles.checkbox__label}>
              @aaaman777 (+7 964 114 3528)
            </span>
          </Checkbox>
          <Checkbox className={styles.checkbox}>
            <span className={styles.checkbox__label}>
              @King05 (+7 435 110 4467)
            </span>
          </Checkbox>
          <Checkbox className={styles.checkbox}>
            <span className={styles.checkbox__label}>
              @rafik (+7 913 125 9057)
            </span>
          </Checkbox>
        </div>
        <Button variant="primary" onClick={onClose}>
          Apply
        </Button>
      </div>
    </Modal>
  );
};
