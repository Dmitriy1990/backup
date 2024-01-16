import { Modal } from "components/modal";
import React, { FC, useMemo } from "react";
import styles from "./style.module.scss";
import { IconBack, IconClose, IconError, IconSuccess } from "assets";
import { Button } from "components/button";
import clsx from "clsx";
import useWindowSize from "hooks/useWindowSize";
import { Checkbox } from "components/checkbox";
import { Content, RootUsers } from "types/users";
import { Scrollbars } from "rc-scrollbars";
import { selectAccountStore } from "store/selectAccount";
import { addUserStore } from "store/addUser";
import { useSnapshot } from "valtio";
import { CheckedDialogs, DialogRoot } from "types/dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  dialogs: CheckedDialogs[];
  setDialogs: (dialogs: CheckedDialogs[]) => void;
};

export const DialogsModal: FC<Props> = ({
  open,
  onClose,
  dialogs,
  setDialogs,
}) => {
  const onCheckDialog = (id: number) => {
    setDialogs(
      dialogs.map((i) =>
        i.dialogId === id ? { ...i, checked: true } : { ...i, checked: false }
      )
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={clsx("modal", styles.modal)}
      notBg
    >
      <div className={clsx("box modal__inner", styles.content)}>
        <div className={styles.header}>
          <IconBack className={styles.header__back} onClick={onClose} />
          <h4 className={clsx("bold", styles.header__title)}>
            Reading dialogs
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
          <Scrollbars autoHeight autoHeightMax={"465px"} autoHide>
            {dialogs.map((item, id) => (
              <Checkbox
                className={styles.checkbox}
                key={id}
                checked={item.checked}
                onChange={() => onCheckDialog(item.dialogId)}
              >
                <span className={styles.checkbox__label}>{item.name}</span>
              </Checkbox>
            ))}
          </Scrollbars>
        </div>
        <Button variant="primary" onClick={onClose}>
          Apply
        </Button>
      </div>
    </Modal>
  );
};
