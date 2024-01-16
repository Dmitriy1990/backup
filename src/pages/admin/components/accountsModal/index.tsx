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

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AccountsModal: FC<Props> = ({ open, onClose }) => {
  const size = useWindowSize();
  const snap = useSnapshot(addUserStore);

  const onCheckUser = (id: number) => {
    const key = snap.selectedAccounts.findIndex((u) => u.id == id);
    if (key !== -1) {
      (addUserStore.selectedAccounts as any) = [
        ...snap.selectedAccounts.slice(0, key),
        {
          ...snap.selectedAccounts[key],
          checked: !snap.selectedAccounts[key].checked,
        },
        ...snap.selectedAccounts.slice(key + 1),
      ];
    }
  };

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
          <Scrollbars autoHeight autoHeightMax={"465px"} autoHide>
            {snap.selectedAccounts.map((item, id) => (
              <Checkbox
                className={styles.checkbox}
                key={id}
                checked={item.checked}
                onChange={() => onCheckUser(item.id)}
              >
                <span className={styles.checkbox__label}>{item.username}</span>
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
